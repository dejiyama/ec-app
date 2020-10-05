import {
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware
} from 'redux'
import {createLogger} from 'redux-logger/src'
import {connectRouter, routerMiddleware} from 'connected-react-router'
import thunk from 'redux-thunk'

import {UsersReducer} from '../users/reducers'
import {ProductsReducer} from '../products/reducers'

export default function createStore(history) {
    const logger = createLogger({
        collapsed: true,
        diff: true
    });

    return reduxCreateStore(
        combineReducers({
            router: connectRouter(history),
            products: ProductsReducer,
            users: UsersReducer
        }),
        applyMiddleware(
            logger,
            routerMiddleware(history),
            thunk
        )
    )
}