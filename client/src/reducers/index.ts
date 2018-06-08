import account from 'reducers/accountReducer'
import { postReducer } from 'reducers/postReducer'
import { ticketReducer } from 'reducers/ticketReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  account,
  ticket: ticketReducer,
  post: postReducer
})

export interface State {
  account: ReturnType<typeof account>
  ticket: ReturnType<typeof ticketReducer>
  post: ReturnType<typeof postReducer>
}

export default rootReducer
