import trainerReducer from './trainerReducer';
import { combineReducers } from 'redux';

// https://redux.js.org/api/combinereducers
const reducers = combineReducers({ // produces redux store state!!
    trainerReducer: trainerReducer
})

export default reducers;