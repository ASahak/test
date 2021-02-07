import React, {useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import UseStyles from './styles';
import {UiGenerateMargin, UIGetMarginLeftRight} from '../../../../utils/handlers';
import useDevice from '../../../../Hooks/use-media-device';
import InputMask from 'react-input-mask';
import {
    useAutoCompleteStyles,
    useFormControlStyles,
    useLabelStyles,
} from '../makeStylesUI';
import variablesJSS from '../../../../static/styles/jss/variables';
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import variables from "../../../../static/styles/jss/variables";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from '@material-ui/core/InputAdornment';
import {addMinutes, isAfter} from 'date-fns';
import 'rmc-picker/assets/index.css';
import MobileTimePicker from 'rmc-picker/lib/Picker';
import Dialog from '@material-ui/core/Dialog';
const canUseDOM = (typeof window !== 'undefined');
React.useLayoutEffect = canUseDOM ? useLayoutEffect : useEffect;

const TimePicker = (props) => {
    const {deviceType} = useDevice();
    const [options, setOptions] = useState([]);
    const [mobileDate, setMobileDate] = useState({
        hour: null,
        minute: null,
    });
    const [isMobile, setIsMobile] = useState(false);
    const [disableBtn, setDisableBtn] = useState({
        prev: false,
        next: false,
    });
    const [time, setTime] = useState(null);
    const [marginBottom, setMarginBottom] = useState('0px');
    const [isOpen, setIsOpen] = useState(false);
    const [propsOfStyles, setPropsOfStyles] = useState({})
    const [autocompleteValue, setAutocompleteValue] = useState({})
    const errorRef = useRef();
    const bottomWrapRef = useRef();
    const inputRef = useRef();
    const maskRef = useRef();
    const styles = UseStyles(propsOfStyles, {link: true});

    // Get position of main Wrapper
    const generateMarginDiv = useCallback(() => UiGenerateMargin(props.margin, props.direction), [props.direction, props.margin]);


    const convertNaturalSize = useCallback((prop, what) => {
        if (isNaN(+prop)) return prop;
        else return prop + what;
    }, [props.width]);

    const sharedPropsOfClasses = useMemo(() => {
        const backgroundColor = props.theme === 'dark' ? variablesJSS.$input.$theme.$dark : variablesJSS.$input.$theme.$light;
        const boxShadow = props.theme === 'dark' ? variablesJSS.$select.$dark.$borderColor + ' 0px 0px 0px 1px' : 'none';
        return {
            backgroundColor,
            boxShadow,
            marginBottom: marginBottom,
            isDark: props.theme === 'dark',
            listItemColor: props.theme === 'dark' ? variables.$select.$dark.$textColor : variables.$select.$textColor,
            selectedItemColor: props.theme === 'dark' ? variables.$select.$dark.$selected.$color : variables.$select.$selected.$color,
            selectedItemBG: props.theme === 'dark' ? variables.$select.$dark.$selected.$bgColor : variables.$select.$selected.$bgColor,
            valueColor: props.theme === 'dark' ? variablesJSS.$datepicker.$dark.$textColor : variablesJSS.$datepicker.$textColor,
            actionsColor: props.theme === 'dark' ? variablesJSS.$datepicker.$dark.$actionsColor : variablesJSS.$datepicker.$actionsColor,
            weekColor: props.theme === 'dark' ? variablesJSS.$datepicker.$dark.$weekColor : variablesJSS.$datepicker.$weekColor,
            placeholderColor: props.theme === 'dark' ? variablesJSS.$select.$dark.$emptyTextColor : variablesJSS.$select.$emptyTextColor,
            size: props.size,
            isOpened: isOpen && !isMobile,
            iconColor: props.theme === 'dark' ? variablesJSS.$input.$theme.$darkColor : '#000',
        }
    }, [isOpen, props.size, props.theme, marginBottom, props.value, isMobile]);

    const classesAutoComplete = useAutoCompleteStyles(sharedPropsOfClasses);

    const classesLabel = useLabelStyles({
        ...sharedPropsOfClasses,
        color: (props.label && props.label.color) || '#fff',
    });

    const classesFormControl = useFormControlStyles({
        ...sharedPropsOfClasses,
        width: props.fullWidth ? `calc(100% - ${UIGetMarginLeftRight(props.margin)}px)` : convertNaturalSize(props.width, 'px'),
        size: props.size,
    });

    useEffect(() => {
        const isDark = props.theme === 'dark';
        setPropsOfStyles({
            isDark: isDark,
            backgroundColor: isDark ? variablesJSS.$input.$theme.$dark : variablesJSS.$input.$theme.$light,
            actionsColor: isDark ? '#fff' : variables.$datepicker.$actionsColor,
            textColor: isDark ? '#fff' : '#000',
            selectedItem: isDark ? 'rgb(251 251 251 / 32%)' : '#BEBEBE',
            border: isDark ? '1px solid #11509F' : 'none',
            overlayBG: isDark ? 'rgb(255 243 243 / 30%)' : 'rgba(0,0,0, .5)',
        })
    }, [props.theme])

    useEffect(() => { // Generate Options
        const generateTime = (time) => {
            return {
                hour: time.split(':')[0],
                minute: time.split(':')[1],
            }
        }
        const getTime = {
            start: {
                ...generateTime(props.options.start)
            }, end: {
                ...generateTime(props.options.end)
            }
        };
        let datePeriod = new Date();
        let dateEnd = new Date();
        datePeriod.setHours(getTime.start.hour);
        datePeriod.setMinutes(getTime.start.minute);
        dateEnd.setHours(getTime.end.hour);
        dateEnd.setMinutes(getTime.end.minute);
        dateEnd = new Date(new Date(dateEnd).getTime() - props.options.interval * 1000 * 60)
        let index = 0;
        const dates = [];
        while(!isAfter(datePeriod, dateEnd)) {
            const newDate = addMinutes(new Date( null, null, null, getTime.start.hour, getTime.start.minute), +props.options.interval * index);
            const option = newDate.getHours() + ':' + (newDate.getMinutes() < 10 ? '0' : '') + newDate.getMinutes();
            dates.push({title: option, value: option});
            const newDatePeriod = generateTime(option)
            datePeriod.setHours(newDatePeriod.hour);
            datePeriod.setMinutes(newDatePeriod.minute);
            index++;
        }
        setOptions(dates);
    }, [props.options]);

    useEffect(() => { // Detect if device is Mobile
        if (deviceType === 'mobile') {
            setIsMobile(true)
        } else setIsMobile(false)
    }, [deviceType])

    useEffect(() => { // Calculate Margin Bottom
        const bottomElementHeight = errorRef.current ? errorRef.current.offsetHeight + 2 :
            bottomWrapRef.current ? bottomWrapRef.current.offsetHeight + 2 : 0;
        setMarginBottom(bottomElementHeight /*marginTopBottom*/ + 'px');
    }, [props.required, props.errors, errorRef.current, props.helperText, bottomWrapRef.current]);

    useEffect(() => {
        (isMobile && maskRef.current) && maskRef.current.blur();
    }, [isOpen, maskRef.current, isMobile])

    useEffect(() => { // Disable the prev/next buttons
        if(time === null && props.value) {
            setTime(props.value);
            setAutocompleteValue({
                title: props.value,
                value: props.value,
            })
        }

        const value = time !== null ? time : props.value || '';
        if (isMobile) setMobileDate({
            hour: value.split(':')[0],
            minute: value.split(':')[1],
        })

        const findIndex = options.findIndex(e => e.value === value);
        setDisableBtn({
            prev: findIndex <= 0 || value && findIndex < 0,
            next: findIndex >= options.length - 1 || value && findIndex < 0,
        })
    }, [props.value, options, time, isMobile])

    const inputMaskChange = (evt) => {
        setTime(evt.target.value)
    };

    const inputBlur = () => {
        if ((time && !options.some(e => e.value === time)) || (typeof time === 'string' && !time.length)  || (autocompleteValue && autocompleteValue.value !== time)){
            setTime(autocompleteValue.value);
        }
        !isMobile && setIsOpen(false)
    }

    const selectTime = ({target}, {title, value}) => {
        setIsOpen(true);
        maskRef.current && maskRef.current.blur();
        setTime(value);
        setAutocompleteValue({
            title,
            value,
        })
    }

    const selectMobileTime = () => {
        const _time = mobileDate.hour + ':' + mobileDate.minute;
        setTime(_time);
        setAutocompleteValue({
            title: _time,
            value: _time,
        })
        setIsOpen(false);
    }

    const mobilePickerValueChange = (val, type) => {
        setMobileDate({
            hour: type === 'hour' ? val : mobileDate.hour,
            minute: type === 'minute' ? val : mobileDate.minute,
        })
    }

    const handleTimePickerClose = () => {
        setIsOpen(false)
        setMobileDate({
            hour: time.split(':')[0],
            minute: time.split(':')[1],
        })
    }

    const LabelProps = useMemo(() => ({
        disableAnimation: true,
        variant: 'filled',
        focused: false,
        shrink: false,
        ...(props.error && {error: props.error})
    }), [props]);

    const arrows = useMemo(() => {
        const changeDirection = (evt, dir) => {
            evt.stopPropagation();
            const currentIndex = options.findIndex(e => e.value === time);
            if (!disableBtn.prev && dir === 'prev') {
                const _value = options[currentIndex > -1 ? currentIndex - 1 : options.length - 1].value;
                setTime(_value)
                setAutocompleteValue({
                    title: _value,
                    value: _value,
                })
            } else if (!disableBtn.next && dir === 'next') {
                const _value = options[currentIndex > -1 ? currentIndex + 1 : 0].value;
                setTime(_value)
                setAutocompleteValue({
                    title: _value,
                    value: _value,
                })
            }
        };
        return (
            <div className={'arrows-slide-datepicker'}>
                <svg onClick={(e) => changeDirection(e, 'prev')} className={`left-icon ${disableBtn.prev ? 'disable-btn' : ''}`} focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 10l5 5 5-5z"></path>
                </svg>
                <svg onClick={(e) => changeDirection(e, 'next')} className={`right-icon ${disableBtn.next ? 'disable-btn' : ''}`} focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 10l5 5 5-5z"></path>
                </svg>
            </div>
        )
    }, [disableBtn, props.value, options, time])

    const mobileDates = useMemo(() => {
        return options.reduce((acc, item) => {
            const splitDate = item.title.replace(/ /g,'').split(':');
            acc[splitDate[0]] = [...(acc[splitDate[0]] || []), splitDate[1]];
            return acc;
        }, {})
    }, [options]);

    const bottomWrap = useMemo(() => {
        if ((props.helperText || props.required) && !props.errors) {
            const text = props.helperText || (props.required ? 'Required *' : '');
            return (
                <div className={styles['bottom-wrap']} ref={bottomWrapRef}>
                    {text && <p className="helper-text">{text}</p>}
                </div>
            )
        } else if (props.errors) return (
            <span ref={errorRef} className={styles['error-line']}>{props.errors}</span>
        )
    }, [props.helperText, props.errors, errorRef]);

    return (
        <FormControl classes={{root: classesFormControl.root}} style={{...generateMarginDiv()}}>
            {props.label && <InputLabel
                classes={classesLabel}
                {...LabelProps}
            >{props.label.title + (props.required ? ' *' : '')}</InputLabel>}
            <div className={`mask-input ${isOpen ? 'focused-input' : ''}`} data-disabled={props.disabled}>
                <InputMask
                    mask="99:99"
                    onFocus={() => !isMobile && setIsOpen(true)}
                    onBlur={() => inputBlur()}
                    value={time || ''}
                    onChange={inputMaskChange}
                    disabled={false}
                    maskChar=""
                >
                    {() => <TextField
                        onClick={() => isMobile && setIsOpen(true)}
                        InputProps={{
                            disabled:props.disabled,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <span className="icon-clock"></span>
                                </InputAdornment>
                            ),
                            endAdornment: (props.slideByArrows ? <InputAdornment position="end">
                                {arrows}
                            </InputAdornment> : null),
                        }} inputRef={maskRef} variant="filled" focused={false} placeholder={props.placeholder}/>}
                </InputMask>
                {isMobile ? <Dialog onClose={handleTimePickerClose} aria-labelledby="simple-dialog-title" open={isOpen} className={styles['timepicker-dialog']}>
                    <div className={styles['mobile-wheel-picker']}>
                        <h4>Select time</h4>
                        <div className="pickers-wrapper">
                            <MobileTimePicker
                                selectedValue={mobileDate.hour}
                                onValueChange={(val) => mobilePickerValueChange(val, 'hour')}
                            >
                                {Object.keys(mobileDates).map(hour => <MobileTimePicker.Item value={hour} key={hour}>{hour}</MobileTimePicker.Item>)}
                            </MobileTimePicker>
                            {mobileDate.hour ? <MobileTimePicker
                                selectedValue={mobileDate.minute}
                                onValueChange={(val) => mobilePickerValueChange(val, 'minute')}
                            >
                                {mobileDates[mobileDate.hour].map(minute => <MobileTimePicker.Item value={minute} key={minute}>{minute}</MobileTimePicker.Item>)}
                            </MobileTimePicker> : ''}
                        </div>
                        <div className="actions-wrap">
                            <button onClick={handleTimePickerClose}>Cancel</button>
                            <button onClick={selectMobileTime}>Select</button>
                        </div>
                    </div>
                </Dialog> : <Autocomplete
                    disabled={props.disabled}
                    disableCloseOnSelect={false}
                    disableListWrap={false}
                    classes={classesAutoComplete}
                    options={options}
                    getOptionSelected={(option, value) => option.title === value.title}
                    renderOption={(option) => <div>{option.title}</div>}
                    getOptionLabel={(option) => option.title}
                    open={isOpen}
                    onOpen={() => setIsOpen(true)}
                    onClose={() => setIsOpen(false)}
                    onChange={selectTime}
                    inputValue={time || ''}
                    value={{title: autocompleteValue.title || '', value: autocompleteValue.value || ''}}
                    defaultValue={props.value ? {title: props.value || '', value: props.value || ''} : null}
                    renderInput={(params) => <TextField inputRef={inputRef} {...params} variant="filled" focused={false}/> }
                />}
            </div>
            {bottomWrap}
        </FormControl>
    )
}
TimePicker.defaultProps = {
    size: 'md',
    fullWidth: false,
    margin: 0,
    required: false,
    theme: 'light',
    format: 'AM',
    slideByArrows: false,
};
TimePicker.propTypes = {
    format: PropTypes.string,
    required: PropTypes.bool,
    slideByArrows: PropTypes.bool,
    theme: PropTypes.string,
    helperText: PropTypes.string,
    direction: PropTypes.string,
    fullWidth: PropTypes.bool,
    size: PropTypes.string,
    refBind: PropTypes.any,
    label: PropTypes.object,
    options: PropTypes.shape({
        start: PropTypes.string,
        interval: PropTypes.string | PropTypes.number,
        end: PropTypes.string,
    }).isRequired,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    errors: PropTypes.string,
    change: PropTypes.func,
    shouldDisablePastDate: PropTypes.bool,
    margin: PropTypes.oneOfType([PropTypes.array, PropTypes.number]),
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ]),
};
export default React.memo(TimePicker);