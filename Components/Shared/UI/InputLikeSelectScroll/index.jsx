import React, {useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import UseStyles from './styles';
import {UiGenerateMargin, UIGetMarginLeftRight} from '../../../../utils/handlers';
import variablesJSS from '../../../../static/styles/jss/variables';
const canUseDOM = (typeof window !== 'undefined');
React.useLayoutEffect = canUseDOM ? useLayoutEffect : useEffect;

const InputLikeSelectWithScroll = (props) => {
    const [inputStyleProps, setInputStyleProps] = useState({});
    const [disablePrevBtn, setDisablePrevBtn] = useState({
        left: false,
        right: false,
    });
    const parentRef = useRef();
    const errorRef = useRef();
    const bottomWrapRef = useRef();
    const inputWrapperRef = useRef();
    const styles = UseStyles(inputStyleProps, {link: true});

    useEffect(() => {
        const findIndexCurrent = props.options.findIndex(e => e.value === props.value);
        setDisablePrevBtn({
            left: findIndexCurrent <= 0,
            right: findIndexCurrent === props.options.length - 1,
        })
    }, [props.value, props.options])

    useLayoutEffect(() => { // Set Inline Styles and send to JSS
        setInputStyleProps({
            ...inputStyleProps,
            disabledColor: (props.theme === 'dark' ? '#0a29559e' : '#ffffffa8'),
            fontSize: variablesJSS.$input['$' + props.size].$fontSize,
            padding: variablesJSS.$input['$' + (props.size || 'md')].$padding,
            textColor: props.theme === 'dark' ? variablesJSS.$select.$dark.$textColor : variablesJSS.$select.$textColor,
            iconColor: props.theme === 'dark' ? variablesJSS.$input.$theme.$darkColor : '#000',
            backgroundColor: props.customStylesInput.background,
            labelColor: props.label && props.label.color || variablesJSS.$input.$baseColor,
            marginBottom: calculateMarginBottom(),
            placeholderColor: props.theme === 'dark' ? variablesJSS.$select.$dark.$emptyTextColor : variablesJSS.$select.$emptyTextColor,
        })
    }, [
        props.size,
        props.theme,
        props.customStylesInput,
        props.errors,
        props.label,
        errorRef.current,
        bottomWrapRef.current,
        props.helperText,
        props.required]);

    const calculateMarginBottom = useCallback(() => { // Calculate Margin Bottom
        const bottomElementHeight = errorRef.current ? errorRef.current.offsetHeight + 2 :
            bottomWrapRef.current ? bottomWrapRef.current.offsetHeight + 2 : 0;
        return bottomElementHeight /*marginTopBottom*/ + 'px'
    }, [props.required, props.errors, errorRef.current, props.helperText, bottomWrapRef.current])

    // Get position of main Wrapper
    const generateMarginDiv = useCallback(() => UiGenerateMargin(props.margin, props.direction), [props.direction, props.margin]);

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

    const label = useMemo(() => {
        if (props.label) {
            const textLabel = props.label.title + (props.required ? ' *' : '');
            return (
                <label className={'label-' + props.size}>{textLabel}</label>
            )
        }
    }, [props.label, props.required]);

    const generateClassNameParent = useMemo(() => {
        return `${styles[props.theme ? 'theme-' + props.theme : '']} ${'wrapper-' + props.size} ${styles['input-wrap']} ${props.errors ? 'error-field' : ''}`
    }, [props.errors, props.theme, props.size]);

    const arrows = useMemo(() => {
        const changeDirection = (dir) => {
            let index;
            const findIndexCurrent = props.options.findIndex(e => e.value === props.value);
            if (findIndexCurrent > -1) {
                if (dir === 'prev') {
                    index = !!findIndexCurrent ? findIndexCurrent - 1 : 0;
                } else {
                    index = findIndexCurrent === props.options.length - 1 ? findIndexCurrent : findIndexCurrent + 1;
                }
            }
            props.change(props.options[index || 0].value)
        };
        return (
            <div className={'arrows-scroll-select'}>
                <svg onClick={() => changeDirection('prev')} className={`left-icon ${disablePrevBtn.left ? 'disable-left' : ''}`} focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 10l5 5 5-5z"></path>
                </svg>
                <svg onClick={() => changeDirection('next')} className={`right-icon ${disablePrevBtn.right ? 'disable-right' : ''}`} focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 10l5 5 5-5z"></path>
                </svg>
            </div>
        )
    }, [props.value, props.options, disablePrevBtn])

    const bottomWrap = useMemo(() => {
        if ((props.helperText || props.required) && !props.errors) {
            const text = props.helperText || (props.required ? 'Required *' : '');
            return (
                <div className="bottom-wrap" ref={bottomWrapRef}>
                    {text && <p className="helper-text">{text}</p>}
                </div>
            )
        } else if (props.errors) return (
            <span ref={errorRef} className={'error-line'}>{props.errors}</span>
        )
    }, [props.helperText, props.errors, errorRef]);

    const options = useMemo(() => {
        return props.options.map((span) => {
            return (
                <span key={span.value} className={`${span.value === props.value ? 'active-option' : ''} every-option`}>{span.title}</span>
            )
        })
    }, [props.value, props.options])

    return (
        <div style={inlineStylesParent}
             className={generateClassNameParent}
             ref={parentRef}>
            {label}
            <div ref={inputWrapperRef} className={'input-element-wrapper'} style={props.customStylesInput} data-disabled={props.disabled}>
                {!props.value ? <span className={'placeholder-option'}>{props.placeholder}</span> : null}
                {options}
                {arrows}
            </div>
            {bottomWrap}
        </div>
    )
}
InputLikeSelectWithScroll.defaultProps = {
    size: 'md',
    type: 'text',
    fullWidth: false,
    margin: 0,
    required: false,
    theme: 'light',
    customStylesInput: {},
    customStylesDiv: {},
    options: [],
};
InputLikeSelectWithScroll.propTypes = {
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    options: PropTypes.array,
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
    margin: PropTypes.oneOfType([PropTypes.array, PropTypes.number]),
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    placeholder: PropTypes.string,
};
export default React.memo(InputLikeSelectWithScroll);