import React from 'react';
import PropTypes from 'prop-types';

const Actions = (props) => {
    return (
        <>
            <button onClick={props.onClick}>Cancel</button>
            <button onClick={props.onSelect} className={props.disableSelect ? 'disable-select': ''}>Select</button>
        </>
    )
}
Actions.propTypes = {
    disableSelect: PropTypes.bool,
}
export default Actions;