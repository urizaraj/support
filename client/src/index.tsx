import { checkSession } from 'actions/accountActions'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import App from './App'
import rootReducer from './reducers'
import registerServiceWorker from './registerServiceWorker'

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root') as HTMLElement
  )
}

store.dispatch(checkSession()).then(render)
// render()

registerServiceWorker()
