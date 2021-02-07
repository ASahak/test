import React, {useState} from 'react';
import PropTypes from 'prop-types';
import UseStyles from './styles';
import Logged from './logged';
import NotLogged from './not-logged';

const AuthPanel = (props) => {
    const styles = UseStyles();

    return (
        <div className={styles['auth-wrapper']}>
            {props.isLogged ? <Logged /> : <NotLogged page={props.routePage}/>}
        </div>
    )
}
AuthPanel.propTypes = {
    routePage: PropTypes.string,
    isLogged: PropTypes.bool,
};
export default AuthPanel;