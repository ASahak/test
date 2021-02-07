import { combineReducers } from 'redux';
import baseReducer from './reducers/base';

export default function createReducer(injectedReducers = {}) {
    return combineReducers({
        ...injectedReducers,
        base: baseReducer,
    });
};