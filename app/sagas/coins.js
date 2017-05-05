import {getPriceOfCoinInCurrency} from '../api/cryptonator'
import {call, all, put, select} from 'redux-saga/effects'
import supportedCoins from '../coins'
import CoinActions from '../redux/coins'

export function * getPrice(coin) {
    const currency = yield select(state => state.coins.currency)
    const response = yield call(getPriceOfCoinInCurrency, coin, currency)
    if (response.ok) {
        return +response.data.ticker.price
    }

    return null
}

export function * loadPrices() {
    const requests = {}
    Object.keys(supportedCoins).forEach(coin => {
        requests[coin] = call(getPrice, coin)
    })
    const response = yield all(requests)

    const effects = {}
    Object.keys(response).forEach(coin => {
        effects[coin] = put(CoinActions.receivePrice(coin, response[coin]))
    })
    yield all(effects)
}

export function * changeCurrency({currency}) {
    yield put(CoinActions.setCurrency(currency))
    yield call(loadPrices)
}