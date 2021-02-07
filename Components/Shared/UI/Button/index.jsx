import React, {useEffect, useLayoutEffect, useRef, useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import UseStyles from './styles';
import {UiGenerateMargin, UIGetMarginLeftRight} from '../../../../utils/handlers';
const canUseDOM = (typeof window !== 'undefined');
React.useLayoutEffect = canUseDOM ? useLayoutEffect : useEffect;

const Button = (props) => {
    const buttonRef = useRef();
    const styles = UseStyles();

    useEffect(() => {
        if (props.attr && buttonRef.current) {
            Object.keys(props.attr).map(name => {
                buttonRef.current.setAttribute(name, props.attr[name])
            })
        }
    }, [props.attr]);

    // Get position of main Wrapper
    const generateMarginDiv = useCallback(() => UiGenerateMargin(props.margin, props.direction), [props.direction, props.margin]);

    const inlineStyles = useMemo(() => {
        return {
            border: props.border,
            background: props.background,
            color: props.color,
            fontSize: props.fontSize + 'px',
            ...((!props.fullWidth && props.width) && {width: props.width + 'px'}),
            ...(props.fullWidth && {width: `calc(100% - ${UIGetMarginLeftRight(props.margin)}px)`, display: 'flex'}),
            ...generateMarginDiv(),
            ...props.customStyles,
        }
    }, [
        props.direction,
        props.margin,
        props.border,
        props.color,
        props.fontSize,
        props.fullWidth,
        props.width,
        props.customStyles,
        props.background,
    ]);

    const icon = useMemo(() => {
        if (props.icon && props.icon.loading) return <i className={'loading-icon'}></i>
        if (props.icon && !props.icon.hasOwnProperty('loading')) return <i className={props.icon.className}></i>
    }, [props.icon])

    const generateClassName = useMemo(() => {
        return `${props.icon ? 'custom-icon-dir-' + (props.icon.direction || 'right') : ''} ${styles['btn-global']} ${styles['btn-' + props.size]} ${props.hover || ''} ${styles['btn-' + props.typeButton]} ${props.className}`
    }, [props.icon, props.size, props.hover, props.typeButton, props.className]);

    return (
        <button
            ref={props.refBind || buttonRef}
            className={generateClassName}
            style={inlineStyles}
            onClick={props.onClick}
            type={props.type}
            disabled={props.disabled}>
            {props.text}
            {icon}
        </button>
    )
};
Button.defaultProps = {
    size: 'md',
    type: 'button',
    fullWidth: false,
    fontSize: 13,
    margin: 0,
    disabled: false,
    customStyles: {},
    typeButton: 'default',
    className: '',
};
Button.propTypes = {
    className: PropTypes.string,
    typeButton: PropTypes.string,
    direction: PropTypes.string,
    attr: PropTypes.object,
    icon: PropTypes.object,
    disabled: PropTypes.bool,
    background: PropTypes.string,
    border: PropTypes.string,
    hover: PropTypes.string,
    fullWidth: PropTypes.bool,
    size: PropTypes.string,
    type: PropTypes.string,
    width: PropTypes.number,
    fontSize: PropTypes.number,
    margin: PropTypes.oneOfType([PropTypes.array, PropTypes.number]),
    text: PropTypes.string,
    customStyles: PropTypes.object,
    refBind: PropTypes.object,
    onClick: PropTypes.func
};
export default React.memo(Button);
