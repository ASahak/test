import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createInjectorsEnhancer } from 'redux-injectors';
import createReducer from './rootReducer';
import rootSaga from './rootSaga';


function configureStore(initialState) {
    const sagaMiddleware = createSagaMiddleware();
    const { run: runSaga } = sagaMiddleware;
    const enhancers = [
        applyMiddleware(sagaMiddleware),
        createInjectorsEnhancer({
            createReducer,
            runSaga,
        }),
    ];
    const store = createStore(
        createReducer(),
        initialState,
        compose(...enhancers)
    );

    store.sagaTask = runSaga(rootSaga);

    return store;
}

export default configureStore;