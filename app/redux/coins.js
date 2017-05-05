import Immutable from 'seamless-immutable'

import {createActions, createReducer} from 'reduxsauce'

const {Types, Creators} = createActions({
    // Reducer actions
    receivePrice: ['coin', 'price'],
    addRow      : null,
    updateRow   : ['index', 'update'],
}, {prefix: 'COIN-'})

export const CoinTypes = Types


const INITIAL_STATE = Immutable({
    prices: {},
    rows  : [],
})

export const receivePrice = (state, {coin, price}) => {
    const update = {}
    update[coin] = price
    return state.merge({prices: update}, {deep: true})
}
export const addRow       = state => state.merge({rows: state.rows.concat([{coin: 'btc', quantity: 0}])})
export const updateRow    = (state, {index, update}) => {
    const newRows = state.rows.map((row, i) => {
        if (i === index) return row.merge(Immutable(update))
        return row
    })

    return state.merge({rows: newRows})
}

export const HANDLERS = {
    [Types.RECEIVE_PRICE]: receivePrice,
    [Types.ADD_ROW]      : addRow,
    [Types.UPDATE_ROW]   : updateRow,
}

export const reducer = createReducer(INITIAL_STATE, HANDLERS)
export default Creators
