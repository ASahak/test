import React from 'react';
import {Button} from '../../Shared/UI';
import {createStructuredSelector} from "reselect";
import {connect} from 'react-redux';
import withReduxSaga from '../../../HOC/withReduxSaga';
import {useInjectReducer, useInjectSaga} from "redux-injectors";
import baseReducer from '../../../store/reducers/base';
import baseSaga from '../../../store/sagas/base';
import {useRouter} from 'next/router';

const HeaderBtn = (props) => {
    useInjectReducer({ key: "base", reducer: baseReducer });
    useInjectSaga({ key: "base", saga: baseSaga });
    const router = useRouter();

    const goToRoute = async () => {
        try {
            if (props.pageName) {
                await router.push(props.pageName === 'login' ? '/register' : '/login')
            } else {
                // todo do something else
            }
        } catch (err) {
            console.error(err.message);
        }
    }
    return (<Button
        className={"ads-button"}
        icon={!props.pageName ? {className: 'icon-plus', direction: 'left'} : {}}
        size={'md'}
        attr={{'data-appear': !props.pageName}}
        text={!props.pageName ? 'Plaats advertentie' : props.pageName === 'register' ? 'Login' : 'Register'}
        typeButton="primary"
        onClick={() => goToRoute()}
    />)
}
const mapStateToProps = createStructuredSelector({
    pageName: state => state.base.pageName,
});
const mapDispatchToProps = (_dispatch) => {
    return {};
};
export default withReduxSaga(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(HeaderBtn),
);
