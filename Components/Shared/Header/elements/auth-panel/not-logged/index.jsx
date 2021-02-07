import React, {useState, useMemo, useCallback} from 'react';
import PropTypes from 'prop-types';
import Popover from '@material-ui/core/Popover';
import Link from 'next/link';
import {useDropDownPopoverStyles} from '../../../../UI/makeStylesUI';
import HeaderBtn from '../../../../../Dumb/HeaderButton';

const languages = [
    {value: 'netherlands', title: 'Netherlands', img: '/images/flags/netherlands.jpg'},
    {value: 'english', title: 'English', img: '/images/flags/england.png'},
    {value: 'deutsch', title: 'Deutsch', img: '/images/flags/german.jpg'}
];

const NotLogged = (props) => {
    const [language, setLanguage] = useState(languages[0]);
    const [anchorEl, setAnchorEl] = useState(null);

    const classesDropDown = useDropDownPopoverStyles({
        margin: '10px 0 0 -10px'
    });
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const changeLanguage = useCallback((e) => {
        setLanguage(e);
    }, [language]);

    const languagesLi = useMemo(() => languages.map(e =>
        <li key={e.value} className={language.value === e.value ? 'active-language' : ''} onClick={() => changeLanguage(e)}>
            <img src={e.img} alt="avatar"/>
            {e.title}
        </li>
    ), [language]);

    return (
        <>
            {props.page ? <span className="user-question">{props.page === 'register' ? 'Already an account?' : 'Not Account yet?'}</span> : null }
            <div className={`language-wrap ${open ? 'language-wrap-open' : ''}`}>
                <img alt="avatar" onClick={(event) => setAnchorEl(event.currentTarget)} src={language.img}/>
                <Popover
                    classes={classesDropDown}
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={() => setAnchorEl(null)}
                    PaperProps={{
                        style: {
                            width: '130px'
                        }
                    }}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <ul className="language-dropdown_popover">
                        {languagesLi}
                    </ul>
                </Popover>
            </div>
            {!props.page ? <Link href="/login" prefetch={false}>
                <a className="user_icon">
                    <span className="icon-user"></span>
                </a>
            </Link> : ''}
            <HeaderBtn />
        </>
    )
}
NotLogged.defaultProps = {
    page: '',
}
NotLogged.propTypes = {
    page: PropTypes.string,
};
export default NotLogged;
