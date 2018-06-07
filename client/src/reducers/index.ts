import account from 'reducers/accountReducer'
import { ticketReducer } from 'reducers/ticketReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  account,
  ticket: ticketReducer
})

export interface State {
  account: ReturnType<typeof account>
  ticket: ReturnType<typeof ticketReducer>
}

export default rootReducer
