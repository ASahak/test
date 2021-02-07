import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import UseStyles from './styles';
import Slider from '@material-ui/core/Slider';
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import {useFormControlStyles, useLabelStyles, useRangeSliderStyles} from "../makeStylesUI";
import {UiGenerateMargin, UIGetMarginLeftRight} from '../../../../utils/handlers';

const InputRange = (props) => {
    const [marginBottom, setMarginBottom] = useState('0px');
    const defaultValue = props.value.length === 1 ? props.value[0] : props.value;
    const [value, setValue] = useState(defaultValue);
    const styles = UseStyles();

    const errorRef = useRef();
    const bottomWrapRef = useRef();

    const handleChange = (event, newValue) => {
        let value = typeof newValue === 'number' ? [newValue] : newValue;
        const maxIndex = value.length;
        if (maxIndex === 1) {
            if (props.min && newValue <= props.min) {
                newValue = props.min;
            } else if (props.max && newValue >= props.max) {
                newValue = props.max;
            }
        } else {
            if (props.min && newValue[0] <= props.min) {
                newValue[0] = props.min;
            }
            if (props.max && newValue[1] >= props.max) {
                newValue[1] = props.max;
            }
        }
        setValue(newValue);
    };

    const resetSlider = () => {
        setValue(defaultValue);
    }

    // Get position of main Wrapper
    const generateMarginDiv = useCallback(() => UiGenerateMargin(props.margin, props.direction), [props.direction, props.margin]);

    const convertNaturalSize = useCallback((prop, what) => {
        if (isNaN(+prop)) return prop;
        else return prop + what;
    }, [props.width]);

    const sharedPropsOfClasses = useMemo(() => {
        return {
            marginBottom: marginBottom,
            size: props.size,
        }
    }, [props.size, marginBottom, props.value]);

    const LabelProps = useMemo(() => ({
        disableAnimation: true,
        variant: 'filled',
        focused: false,
        shrink: false,
        ...(props.error && {error: props.error})
    }), [props]);

    const topActions = useMemo(() => {
        let rangeValue;
        const _value = typeof value === 'number' ? [value] : value;
        if (_value[0] >= 0 && !_value[1]) rangeValue = _value[0] === 0 ? '...' : _value[0] + ' ' + props.sizeOption
        else rangeValue = (_value[0] === 0 && _value[1] === 0) ? '...' : _value[0] + ' ' + props.sizeOption + ' - ' + _value[1] + ' ' + props.sizeOption
        return (
            <div className={styles['value-badge-wrapper']}>
                <span className="value-badge">{rangeValue}</span>
                {(_value.some(e => e > 0)) && <span className="reset-icon icon-bin" onClick={resetSlider}></span>}
            </div>
        )
    }, [value])

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

    const classesRangeSlider = useRangeSliderStyles({
        ...sharedPropsOfClasses,
    });
    const classesFormControl = useFormControlStyles({
        ...sharedPropsOfClasses,
        width: props.fullWidth ? `calc(100% - ${UIGetMarginLeftRight(props.margin)}px)` : convertNaturalSize(props.width, 'px'),
        size: props.size,
    });

    const classesLabel = useLabelStyles({
        ...sharedPropsOfClasses,
        color: (props.label && props.label.color) || '#fff',
    });


    useEffect(() => { // Calculate Margin Bottom
        const bottomElementHeight = errorRef.current ? errorRef.current.offsetHeight + 2 :
            bottomWrapRef.current ? bottomWrapRef.current.offsetHeight + 2 : 0;
        setMarginBottom(bottomElementHeight /*marginTopBottom*/ + 'px');
    }, [props.required, props.errors, errorRef.current, props.helperText, bottomWrapRef.current]);

    return (
        <FormControl classes={{root: classesFormControl.root}} style={{...generateMarginDiv()}}>
            {props.label && <InputLabel
                classes={classesLabel}
                {...LabelProps}
            >{props.label.title + (props.required ? ' *' : '')}</InputLabel>}
            <div className={`${styles['input-slider']}`} data-disabled={props.disabled}>
                <Slider
                    disabled={props.disabled}
                    classes={classesRangeSlider}
                    value={value}
                    defaultValue={defaultValue}
                    onChange={handleChange}
                    valueLabelDisplay="off"
                    aria-labelledby="range-slider"
                />
                {topActions}
                {bottomWrap}
            </div>
        </FormControl>
    )
}

InputRange.defaultProps = {
    size: 'md',
    fullWidth: false,
    margin: 0,
    required: false,
    min: 0,
    max: 100,
    value: [0],
};
InputRange.propTypes = {
    sizeOption: PropTypes.string,
    fullWidth: PropTypes.bool,
    size: PropTypes.string,
    min: (props) => {
        if (typeof props.min === 'number') {
            if (props.value.some(e => e < props.min)) throw new Error('Minimum value can\'t be smaller than value')
        } else throw new Error('Minimum value must be Number')
    },
    max: PropTypes.number,
    change: PropTypes.func,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    errors: PropTypes.string,
    label: PropTypes.object,
    helperText: PropTypes.string,
    direction: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    margin: PropTypes.oneOfType([PropTypes.array, PropTypes.number]),
    value: PropTypes.array,
};
export default React.memo(InputRange);
