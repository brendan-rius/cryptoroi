import Reactotron from 'reactotron-react-js'
import {applyMiddleware, compose} from 'redux';
import rootReducer from '../redux/index';
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas/index'

export default function configureStore(initialState) {
    const sagaMiddleware = createSagaMiddleware()

    const store = Reactotron.createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(sagaMiddleware)),
    )

    sagaMiddleware.run(rootSaga)

    return store;
}
