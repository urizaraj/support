import account from 'reducers/accountReducer'
import { postReducer } from 'reducers/postReducer'
import { teamReducer } from 'reducers/teamReducer'
import { ticketReducer } from 'reducers/ticketReducer'
import { combineReducers } from 'redux'
import userReducer from './userReducer'

const rootReducer = combineReducers({
  account,
  ticket: ticketReducer,
  post: postReducer,
  team: teamReducer,
  user: userReducer
})

export interface State {
  account: ReturnType<typeof account>
  ticket: ReturnType<typeof ticketReducer>
  post: ReturnType<typeof postReducer>
  team: ReturnType<typeof teamReducer>
  user: ReturnType<typeof userReducer>
}

export default rootReducer
