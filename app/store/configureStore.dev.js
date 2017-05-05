import {applyMiddleware, compose, createStore} from 'redux';
import rootReducer from '../redux/index';
import DevTools from '../containers/DevTools';
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas/index'

export default function configureStore(initialState) {
    const sagaMiddleware = createSagaMiddleware()

    const store = createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(sagaMiddleware), DevTools.instrument()),
    )

    sagaMiddleware.run(rootSaga)

    return store;
}
