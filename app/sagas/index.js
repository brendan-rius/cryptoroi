import {StartupTypes} from '../redux/startup'
import {CoinTypes} from '../redux/coins'
import {takeEvery} from 'redux-saga/effects'
import {startup} from './startup'
import {all} from 'redux-saga/effects'
import {changeCurrency} from './coins'

export default function * rootSaga() {
    yield all([
        yield takeEvery(StartupTypes.STARTUP, startup),
        yield takeEvery(CoinTypes.CHANGE_CURRENCY, changeCurrency),
    ])
}
