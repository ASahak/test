import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import UseStyles from './styles';
import {Container, Row, Col} from 'reactstrap';
import Search from './elements/search';
import AuthPanel from './elements/auth-panel';
import Link from 'next/link';
import {useRouter} from "next/router";
import {useScrollDirection} from '../../../Hooks/use-scroll';
import useDevice from '../../../Hooks/use-media-device';
import { connect } from 'react-redux';
import withReduxSaga from '../../../HOC/withReduxSaga';
import {
    toggleCategoriesMenuMobile,
    setPageName,
} from '../../../store/actions';
import { createStructuredSelector } from 'reselect';
import baseReducer from '../../../store/reducers/base';
import baseSaga from '../../../store/sagas/base';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';

const Header = (props) => {
    useInjectReducer({ key: "base", reducer: baseReducer });
    useInjectSaga({ key: "base", saga: baseSaga });

    const {deviceType, deviceSize, windowWidth} = useDevice();
    const {scrollDir, scrollY} = useScrollDirection();
    const router = useRouter();
    const headerRef = useRef();
    const styles = UseStyles();
    const [searchMobileToggle, setSearchMobileToggle] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(0);
    const [isLogged, setIsLogged] = useState(false); // Need to use as prop instead of state

    const toggleSearchBar = () => {
        setSearchMobileToggle(!searchMobileToggle)
    }

    useEffect(() => {
        const handleRouteChange = (url, { shallow }) => {
            if (url === '/login') props.setPageName('login');
            else if (url === '/register') props.setPageName('register');
            else props.setPageName('');
            setSearchMobileToggle(false);
        }
        router.events.on('routeChangeComplete', handleRouteChange)
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [])

    useEffect(() => {
        if (typeof window !== undefined && headerRef.current) {
            const _height = headerRef.current.getBoundingClientRect().height;
            setHeaderHeight(_height);
            document.body.style.paddingTop = _height + 'px';
            headerRef.current.style.maxWidth = headerRef.current.parentNode.getBoundingClientRect().width + 'px';
        }
    }, [headerRef.current, props.pageName, windowWidth]);

    useEffect(() => {
        if (typeof window !== undefined && !props.pageName) {
            const isOpenMobile = searchMobileToggle ? headerRef.current.querySelector('form').getBoundingClientRect().height + 16/*MarginTop - absolute margin*/ : 0;
            if (deviceType === 'mobile' && scrollDir) {
                if (scrollY > headerHeight + isOpenMobile && scrollDir === 'down') {
                    headerRef.current.style.top = (-headerHeight - isOpenMobile) + 'px'
                }
                if (scrollY > headerHeight + isOpenMobile && scrollDir === 'up') {
                    headerRef.current.style.position = 'fixed'
                    headerRef.current.style.top = '0px'
                }
                if (scrollY === 0) headerRef.current.style.position = 'absolute'
            }
        }
    }, [scrollDir, scrollY, deviceType, headerRef.current, headerHeight, searchMobileToggle, props.pageName])

    useEffect(() => {
        if (router.pathname === '/login') props.setPageName('login');
        else if (router.pathname === '/register') props.setPageName('register');
        else props.setPageName('');
    }, [router]);

    return (
        <header ref={headerRef}>
            <Container>
                <Row>
                    <Col xs={props.pageName ? 4 : 6} sm={6} md={6} lg={props.pageName ? 6 : 3}>
                        <div className={styles['logo-wrapper']} suppressHydrationWarning={true}>
                            {!props.pageName ? <span className="icon-menu toggle-categories_menu" onClick={() => props.toggleMobileCategoriesMenu(true)}></span> : null}
                            <Link href="/" prefetch={false}>
                                <a>
                                    <img alt="logo" src="/images/logo2.svg"/>
                                </a>
                            </Link>
                        </div>
                    </Col>
                    {!props.pageName ? <Col xs={{order: 'last', size: 12}} lg={{order: 0, size: 6}}>
                        <Search openMobile={searchMobileToggle} />
                    </Col> : ''}
                    <Col xs={props.pageName ? 8 : 6} sm={6} md={6} lg={props.pageName ? 6 : 3}>
                        <div className={styles['mobile-toggle_search-bar']} suppressHydrationWarning={true}>
                            {!props.pageName && (deviceSize === 'xs' || deviceSize === 'xss') ? <span className={`icon-search ${searchMobileToggle ? 'opened-search-icon' : ''}`} onClick={toggleSearchBar}></span> : null}
                            <AuthPanel isLogged={isLogged} routePage={props.pageName} />
                        </div>
                    </Col>
                </Row>
            </Container>
        </header>
    )
}
Header.propTypes = {
    pageName: PropTypes.string,
    setPageName: PropTypes.func,
    toggleMobileCategoriesMenu: PropTypes.func,
};
const mapStateToProps = createStructuredSelector({
    categoriesMobileToggle: state => state.base.categoriesMobileToggle,
    pageName: state => state.base.pageName,
});
const mapDispatchToProps = (dispatch) => {
    return {
        setPageName: (value) => {
            return dispatch(setPageName(value));
        },
        toggleMobileCategoriesMenu: (value) => {
            return dispatch(toggleCategoriesMenuMobile(value));
        },
    };
};
export default withReduxSaga(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(Header),
);
