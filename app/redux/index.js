import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux';
import {reducer as coinReducer} from '../redux/coins'

export default combineReducers({
    routing: routerReducer,
    coins  : coinReducer,
});
