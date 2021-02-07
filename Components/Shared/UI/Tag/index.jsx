import React, {useCallback, useMemo} from 'react';
import UseStyles from './styles';
import PropTypes from 'prop-types';
import {UiGenerateMargin} from '../../../../utils/handlers';

const Tag = (props) => {
    const styles = UseStyles();

    const toggleTag = useCallback((X) => {
        if (props.withX && X === 'div' && props.selected) return;
        props.toggle(props.id)
    }, [props.toggle, props.withX, props.selected])

    const generateMarginDiv = useCallback(() => UiGenerateMargin(props.margin), [props.margin]);

    const isRightActions = useMemo(() => {
        return props.withX || props.count
    }, [props.withX, props.count]);

    const inlineStylesParent = useMemo(() => { // Set inline styles on the main Wrapper
        return {
            ...generateMarginDiv(),
            width: props.width ? props.width + 'px' : 'auto',
        }
    }, [
        props.width,
        props.margin,
    ]);

    return (
        <div data-disabled={props.disabled} className={`${props.size + '-wrapper-tag'} ${styles['tag-wrapper']} ${isRightActions ? 'with-actions' : ''} ${props.selected ? 'selected-tag' : ''}`}
             style={inlineStylesParent} onClick={() => toggleTag('div')}>
            <p>{props.text}</p>
            {isRightActions ? <div>
                {props.count ? <span className="count-ads">({props.count})</span> : ''}
                {props.withX && props.selected ? <span className="with-x icon-cross" onClick={() => toggleTag('icon')}></span> : ''}
            </div> : null}
        </div>
    )
};
Tag.defaultProps = {
    margin: 0,
    size: 'md',
};
Tag.propTypes = {
    margin: PropTypes.oneOfType([PropTypes.array, PropTypes.number]),
    withX: PropTypes.bool,
    disabled: PropTypes.bool,
    size: PropTypes.string,
    toggle: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    count: PropTypes.number,
    width: PropTypes.number,
    selected: PropTypes.bool.isRequired,
};
export default React.memo(Tag);
