import React, {useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
import UseStyles from './styles';
import {UiGenerateMargin, UIGetMarginLeftRight} from '../../../../utils/handlers';
import useDevice from '../../../../Hooks/use-media-device';
import DateFnsUtils from '@date-io/date-fns';
import {isToday, isYesterday, isTomorrow, addDays, isPast} from 'date-fns'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {InputAdornment} from '@material-ui/core';
import {
    useDatePickerStyles,
    useLabelStyles,
    usePickerPaperStyles,
} from '../makeStylesUI';
import Actions from './elements/actions';
import variablesJSS from '../../../../static/styles/jss/variables';
const canUseDOM = (typeof window !== 'undefined');
React.useLayoutEffect = canUseDOM ? useLayoutEffect : useEffect;

const convertDateToDays = (date) => {
    if (isYesterday(date)) return 'Yesterday';
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    else return null
}

const DatePicker = (props) => {
    const {deviceType} = useDevice();
    const [isMobile, setIsMobile] = useState(false);
    const [disablePrevBtn, setDisablePrevBtn] = useState(false);
    const [selectedDate, setSelectedDate] = useState({
        changed: null,
        selected: null,
    });
    const [datePickerOwnError, setDatePickerOwnError] = useState(null);
    const [marginBottom, setMarginBottom] = useState('0px');
    const [isOpen, setIsOpen] = useState(false);
    const parentRef = useRef();
    const errorRef = useRef();
    const bottomWrapRef = useRef();
    const inputWrapperRef = useRef();
    const styles = UseStyles();

    // Get position of main Wrapper
    const generateMarginDiv = useCallback(() => UiGenerateMargin(props.margin, props.direction), [props.direction, props.margin]);

    const currentDate = useCallback(() => {
        return selectedDate.selected || props.value || new Date()
    }, [selectedDate, props.value])

    useEffect(() => {
        if (selectedDate.selected) {
             datePickerOwnError && setDatePickerOwnError(null);
        }
    }, [selectedDate.selected]);

    const sharedPropsOfClasses = useMemo(() => {
        const backgroundColor = props.theme === 'dark' ? variablesJSS.$input.$theme.$dark : variablesJSS.$input.$theme.$light;
        const boxShadow = props.theme === 'dark' ? variablesJSS.$select.$dark.$borderColor + ' 0px 0px 0px 1px inset' : 'none';
        return {
            backgroundColor,
            boxShadow,
            marginBottom: marginBottom,
            isDark: props.theme === 'dark',
            valueColor: props.theme === 'dark' ? variablesJSS.$datepicker.$dark.$textColor : variablesJSS.$datepicker.$textColor,
            actionsColor: props.theme === 'dark' ? variablesJSS.$datepicker.$dark.$actionsColor : variablesJSS.$datepicker.$actionsColor,
            weekColor: props.theme === 'dark' ? variablesJSS.$datepicker.$dark.$weekColor : variablesJSS.$datepicker.$weekColor,
            placeholderColor: props.theme === 'dark' ? variablesJSS.$select.$dark.$emptyTextColor : variablesJSS.$select.$emptyTextColor,
            size: props.size,
            isOpened: isOpen,
            iconColor: props.theme === 'dark' ? variablesJSS.$input.$theme.$darkColor : '#000',
            dayNearly: convertDateToDays(currentDate()),
        }
    }, [isOpen, props.size, props.theme, currentDate, marginBottom, selectedDate, props.value]);

    const classesDatePaper = usePickerPaperStyles(sharedPropsOfClasses);

    const classesLabel = useLabelStyles({
        ...sharedPropsOfClasses,
        color: (props.label && props.label.color) || '#fff',
    });

    const classesDatePicker = useDatePickerStyles(sharedPropsOfClasses);

    useEffect(() => { // Detect if device is Mobile
        if (deviceType === 'mobile') {
            setIsMobile(true)
        } else setIsMobile(false)
    }, [deviceType])


    useEffect(() => { // Calculate Margin Bottom
        const bottomElementHeight = errorRef.current ? errorRef.current.offsetHeight + 2 :
            bottomWrapRef.current ? bottomWrapRef.current.offsetHeight + 2 : 0;
        setMarginBottom(bottomElementHeight /*marginTopBottom*/ + 'px');
    }, [props.required, props.errors, errorRef.current, props.helperText, bottomWrapRef.current, datePickerOwnError]);

    useEffect(() => { // Disable the prev/next buttons
        const date = currentDate();
        if (isToday(date) || isPast(date) && props.shouldDisablePastDate) {
            setDisablePrevBtn(true)
        } else setDisablePrevBtn(false);
    }, [selectedDate, currentDate, props.value, props.shouldDisablePastDate])

    const handleDateChange = (date) => {
        setSelectedDate({
            selected: selectedDate.selected,
            changed: date,
        })
    };

    const inlineStylesParent = useMemo(() => { // Set inline styles on the main Wrapper
        return {
            ...generateMarginDiv(),
            width: props.fullWidth ? `calc(100% - ${UIGetMarginLeftRight(props.margin)}px)` : props.width,
            ...(props.label && {
                display: 'flex',
                flexDirection: 'column'
            }),
            ...(!props.label && {
                display: 'block',
            }),
            ...props.customStylesDiv
        }
    }, [
        props.customStylesDiv,
        props.label,
        props.fullWidth,
        props.direction,
        props.width,
        props.margin]);

    const setBottomActions = (container) => { // The DatePicker doesn't have cancel or ok button for mobile that is why we should make by custom
        const cancelPicker = () => {
            setIsOpen(false);
        }
        const selectPicker = () => {
            if (!selectedDate.changed) {
                setSelectedDate({
                    selected: props.value || new Date(),
                    changed: null,
                })
            } else {
                setSelectedDate({
                    selected: selectedDate.changed,
                    changed: selectedDate.changed,
                })
            }
            setIsOpen(false);
        }
        if (isOpen && container) {
            const actionsWrap = document.createElement('DIV');
            actionsWrap.className = 'datepicker-actions-wrap';
            container.appendChild(actionsWrap);
            ReactDOM.render(
                <Actions
                    onClick={() => cancelPicker()}
                    onSelect={() => selectPicker()}/>,
                container.querySelector('.datepicker-actions-wrap'));
        }
    }

    const generateClassNameParent = useMemo(() => {
        return `${styles[props.theme ? 'theme-' + props.theme : '']} ${'wrapper-' + props.size} ${styles['input-wrap']} ${props.errors ? 'error-field' : ''}`
    }, [props.errors, props.theme, props.size]);

    const arrows = useMemo(() => {
        const changeDirection = (dir) => {
            const date = addDays(currentDate(), dir === 'prev' ? -1 : 1);
            if (!isToday(date) && isPast(date) && props.shouldDisablePastDate && dir !== 'next') return;
            setSelectedDate({
                selected: date,
                changed: date,
            })
        };
        return (
            <div className={'arrows-slide-datepicker'}>
                <svg onClick={() => changeDirection('prev')} className={`left-icon ${disablePrevBtn ? 'disable-btn' : ''}`} focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 10l5 5 5-5z"></path>
                </svg>
                <svg onClick={() => changeDirection('next')} className={'right-icon'} focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 10l5 5 5-5z"></path>
                </svg>
            </div>
        )
    }, [currentDate, disablePrevBtn, selectedDate.selected, props.value, props.options])

    const bottomWrap = useMemo(() => {
        if ((props.helperText || props.required) && !props.errors && !datePickerOwnError) {
            const text = props.helperText || (props.required ? 'Required *' : '');
            return (
                <div className={styles['bottom-wrap']} ref={bottomWrapRef}>
                    {text && <p className="helper-text">{text}</p>}
                </div>
            )
        } else if (props.errors || datePickerOwnError) return (
            <span ref={errorRef} className={styles['error-line']}>{props.errors || datePickerOwnError}</span>
        )
    }, [props.helperText, props.errors, errorRef, datePickerOwnError]);

    return (
        <div style={inlineStylesParent}
             className={generateClassNameParent}
             ref={parentRef}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <div ref={inputWrapperRef} className={'input-element-wrapper'} style={props.customStylesInput}>
                    <KeyboardDatePicker
                        InputAdornmentProps={{ position: "start" }}
                        keyboardIcon={<span className={'icon-calendar'}></span>}
                        classes={classesDatePicker}
                        onError={(err) => err && setDatePickerOwnError(err)}
                        InputLabelProps={{
                            disableAnimation: true,
                            variant: 'filled',
                            focused: false,
                            shrink: true,
                            classes: classesLabel
                        }}
                        placeholder={props.format}
                        disableToolbar
                        KeyboardButtonProps={{
                            onFocus: e => {
                                setIsOpen(true);
                            },
                            'aria-label': 'change date',
                        }}
                        PopoverProps={{
                            key: selectedDate.changed,
                            anchorOrigin: {
                                vertical: "bottom",
                                horizontal: "left"
                            },
                            transformOrigin: {
                                vertical: "top",
                                horizontal: "left"
                            },
                            getContentAnchorEl: null,
                            classes: classesDatePaper,
                            className: isMobile ? 'mobile-mode_datePicker' : '',
                            disableRestoreFocus: true,
                            onEnter: (e) => setBottomActions(e),
                            onClose: () => {
                                setIsOpen(false);
                            }
                        }}
                        InputProps={{
                            endAdornment: (props.slideByArrows ? <InputAdornment position="end">
                                {arrows}
                            </InputAdornment> : null),
                            onFocus: () => {
                                setIsOpen(true);
                            }
                        }}
                        disablePast={props.shouldDisablePastDate}
                        fullWidth
                        disabled={props.disabled}
                        open={isOpen}
                        inputVariant="filled"
                        variant={'inline'}
                        format={props.format}
                        margin="normal"
                        label={props.label && props.label.title + (props.required ? ' *' : '')}
                        value={currentDate()}
                        onChange={handleDateChange}
                    />
                    {bottomWrap}
                </div>
            </MuiPickersUtilsProvider>
        </div>
    )
}
DatePicker.defaultProps = {
    size: 'md',
    type: 'text',
    fullWidth: false,
    margin: 0,
    required: false,
    theme: 'light',
    customStylesInput: {},
    customStylesDiv: {},
    format: 'MM/dd/yyyy',
    width: 310,
    shouldDisablePastDate: true,
    slideByArrows: false,
};
DatePicker.propTypes = {
    format: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    slideByArrows: PropTypes.bool,
    theme: PropTypes.string,
    helperText: PropTypes.string,
    direction: PropTypes.string,
    fullWidth: PropTypes.bool,
    size: PropTypes.string,
    refBind: PropTypes.any,
    label: PropTypes.object,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    errors: PropTypes.string,
    change: PropTypes.func,
    customStylesDiv: PropTypes.object,
    customStylesInput: PropTypes.object,
    shouldDisablePastDate: PropTypes.bool,
    margin: PropTypes.oneOfType([PropTypes.array, PropTypes.number]),
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ]),
};
export default React.memo(DatePicker);