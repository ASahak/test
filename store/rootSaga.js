import { all, call, fork } from 'redux-saga/effects';
import baseSage from './sagas/base';

export default function* rootSaga() {
    yield all([
        fork(baseSage)
    ]);
}