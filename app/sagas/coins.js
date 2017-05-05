import {getPriceOfCoinInCurrency} from '../api/cryptonator'
import {call, all, put} from 'redux-saga/effects'
import supportedCoins from '../coins'
import CoinActions from '../redux/coins'

export function * getPrice(coin) {
    const response = yield call(getPriceOfCoinInCurrency, coin, 'eur')
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