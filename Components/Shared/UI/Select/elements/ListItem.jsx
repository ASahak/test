import React, {useCallback, useMemo} from 'react';
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import PropTypes from "prop-types";
import {
    Image
} from '../../../UI';

const ListItem = React.forwardRef((props, ref) => {
    const isItemObject = props.itemField.constructor === Object;
    const title = isItemObject ? props.itemField.title : props.itemField;

    const likeAvatar = useCallback((title) => {
        const firstLetter = title.charAt(0).toUpperCase();
        return (
            <span className="like-avatar">{firstLetter}</span>
        )
    }, [props.itemField]);

    return (
        <>
            {(props.withAvatar || props.withIcon) ? <ListItemIcon>
                {props.withAvatar ?
                    props.itemField.avatar ? <Image src={props.itemField.avatar}/> : likeAvatar(props.itemField.title)
                    : <span className={`icon icon-${props.itemField.icon}`}></span>}
            </ListItemIcon> : null}
            <ListItemText primary={title} />
        </>
    )
});

ListItem.defaultProps = {
    withAvatar: false,
    withIcon: false,
    itemField: {},
}
ListItem.propTypes = {
    itemField: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.object,
    ]),
    withAvatar: PropTypes.bool,
    withIcon: PropTypes.bool,
};

export default ListItem;