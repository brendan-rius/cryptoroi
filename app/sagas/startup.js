import {call} from 'redux-saga/effects'
import {loadPrices} from './coins'

export function * startup() {
    yield call(loadPrices)
}