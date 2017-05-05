import Immutable from 'seamless-immutable'

import {createActions, createReducer} from 'reduxsauce'

const {Types, Creators} = createActions({
    // System & User actions
    startup: null,
}, {prefix: 'STARTUP-'})

export const StartupTypes = Types


const INITIAL_STATE = Immutable({})


export const HANDLERS = {}

export const reducers = createReducer(INITIAL_STATE, HANDLERS)
export default Creators
