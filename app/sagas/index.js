import {StartupTypes}from '../redux/startup'
import {takeEvery} from 'redux-saga/effects'
import {startup} from './startup'
import {all} from 'redux-saga/effects'

export default function * rootSaga() {
    yield all([
        yield takeEvery(StartupTypes.STARTUP, startup),
    ])
}
