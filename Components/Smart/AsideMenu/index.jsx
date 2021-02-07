import React, {useCallback, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import dummyList from './dummyList';
import UseStyles from './styles';
import Link from 'next/link';
import baseReducer from '../../../store/reducers/base';
import baseSaga from '../../../store/sagas/base';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import {createStructuredSelector} from "reselect";
import {connect} from 'react-redux';
import withReduxSaga from '../../../HOC/withReduxSaga';
import useOnClickOutside from '../../../Hooks/use-onClick-outside';
import useDevice from '../../../Hooks/use-media-device';
import {
    toggleCategoriesMenuMobile,
} from '../../../store/actions';
import HeaderBtn from '../../../Components/Dumb/HeaderButton';

const List = (props) => {
    const activeCategoryPath = null;
    const [activeItemMobile, setActiveItemMobile] = useState(activeCategoryPath);
    const [activeCategoryName, setActiveCategoryName] = useState('');

    const slideDeep = useCallback((item) => {
        if (props.isMobile && props.toggleDeep) {
            setActiveItemMobile(item.pathname);
            setActiveCategoryName(item.title);
            props.toggleDeep(true);
        }
    }, [props.toggleDeep, activeItemMobile, props.isMobile, activeCategoryName])

    return <ul type="none" className={`${props.subMenu ? 'sub-list_menu' : ''} ${!props.subMenu && props.isDeep ? 'slide-to-left' : ''}`}>
        {props.data.map((item, index) => {
            if (item.pathname === 'back-item') return <li key={index} className="back-to-parent_category">{item.title}</li>
            else return <li key={index} className={!props.subMenu && activeItemMobile === item.pathname ? 'active-mobile-item' : ''}>
                <Link href={item.pathname}>
                    <a>
                        {item.title}
                    </a>
                </Link>
                {item.subMenu ? <>
                    <span className="icon-ctrl arrow_icon_list-item" onClick={() => slideDeep(item)}></span>
                    <List data={[...(activeCategoryName && [{title: activeCategoryName, pathname: 'back-item'}]), ...item.subMenu]} subMenu={true}/>
                </> : ''}
            </li>
        })}
    </ul>
}
List.propTypes = {
    isMobile: PropTypes.bool,
    isDeep: PropTypes.bool,
    toggleDeep: PropTypes.func,
    data: PropTypes.array,
    subMenu: PropTypes.bool,
}

const AsideMenu = React.memo((props) => {
    const [isDeep, setIsDeep] = useState(false);
    const asideRef = useRef();
    const mobileTopPanelRef = useRef();
    const {deviceType} = useDevice();
    useInjectReducer({ key: "base", reducer: baseReducer });
    useInjectSaga({ key: "base", saga: baseSaga });
    useOnClickOutside(asideRef, () => {
        if (props.categoriesMobileToggle && deviceType === 'mobile') {
            closeAsideMenu()
        }
    });
    const styles = UseStyles();

    const toggleDeep = (val) => {
        setIsDeep(val)
    }

    function closeAsideMenu () {
        setTimeout(() => {
            toggleDeep(false)
        }, 400); // Should wait until teh sideBar menu will gone to disappear
        props.toggleMobileCategoriesMenu(false);
    }

    useEffect(() => {
        const isSSR = typeof window !== "undefined";
        if (isSSR && deviceType === 'mobile') {
            document.body.style.paddingRight = props.categoriesMobileToggle ? '17px' : '0';
            document.body.style.overflow = props.categoriesMobileToggle ? 'hidden' : 'initial';
        }
    }, [props.categoriesMobileToggle, deviceType]);

    return (
        <aside className={`${styles['aside-menu-bar']} ${props.categoriesMobileToggle ? 'open-mobile-categories_menu' : ''}`}>
            <div ref={asideRef}>
                {deviceType === 'mobile' ? <div ref={mobileTopPanelRef} className="mobile-top-panel">
                    {isDeep ? <p onClick={() => setIsDeep(false)}>
                        <span className="icon-ctrl icon-back-arrow"></span>
                        All categories
                    </p> : <>
                        <span className="icon-cross close-menu_icon" onClick={() => closeAsideMenu()}></span>
                        <HeaderBtn />
                    </>}
                </div> : ''}
                <List data={dummyList} isMobile={deviceType === 'mobile'} toggleDeep={toggleDeep} isDeep={isDeep}/>
                {deviceType === 'mobile' ? <div className="login-creat-account_wrapper">
                    <Link href={'/login'}>
                        <a><span className="icon-user"></span>Login</a>
                    </Link>
                    <Link href={'/register'}>
                        <a><span className="icon-user-plus"></span>Create Account</a>
                    </Link>
                </div> : ''}
            </div>
        </aside>
    )
});
AsideMenu.propTypes = {
    toggleMobileCategoriesMenu: PropTypes.func,
    categoriesMobileToggle: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
    categoriesMobileToggle: state => state.base.categoriesMobileToggle,
});
const mapDispatchToProps = (dispatch) => {
    return {
        toggleMobileCategoriesMenu: (value) => {
            return dispatch(toggleCategoriesMenuMobile(value));
        },
    };
};

export default withReduxSaga(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(AsideMenu),
);
