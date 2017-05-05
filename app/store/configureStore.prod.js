import {applyMiddleware, createStore} from 'redux';
import rootReducer from '../redux/index';
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas/index'

export default function configureStore(initialState) {
    const sagaMiddleware = createSagaMiddleware()

    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(sagaMiddleware),
    );

    sagaMiddleware.run(rootSaga)

    return store
}
