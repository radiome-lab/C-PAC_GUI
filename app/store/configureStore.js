import { createStore, applyMiddleware, compose } from 'redux'
import { createHashHistory } from 'history'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware, routerActions } from 'react-router-redux'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers'
import rootSaga from '../sagas'

export const history = createHashHistory()

const router = routerMiddleware(history)
const sagaMiddleware = createSagaMiddleware()
const logger = createLogger({
  level: 'info',
  collapsed: true
})

export const configureStore = (initialState) => {
  const middleware = []
  const enhancers = []

  if (process.env.NODE_ENV !== 'test') {
    middleware.push(logger)
  }

  middleware.push(router)
  middleware.push(sagaMiddleware)

  enhancers.push(applyMiddleware(...middleware))

  const actionCreators = {
    ...routerActions,
  }

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      actionCreators,
    })
    : compose

  const enhancer = composeEnhancers(...enhancers)

  const store = createStore(rootReducer, initialState, enhancer)

  let sagaTask = sagaMiddleware.run(rootSaga)

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers')))

    module.hot.accept('../sagas', () => {
      const getNewSagas = require('../sagas');
      sagaTask.cancel()
      sagaTask.done.then(() => {
        sagaTask = sagaMiddleware.run(getNewSagas.default)
      })
    })
  }

  return store
}