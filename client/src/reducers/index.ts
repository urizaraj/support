import account from 'reducers/accountReducer'
import { postReducer } from 'reducers/postReducer'
import { teamReducer } from 'reducers/teamReducer'
import { ticketReducer } from 'reducers/ticketReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  account,
  ticket: ticketReducer,
  post: postReducer,
  team: teamReducer
})

export interface State {
  account: ReturnType<typeof account>
  ticket: ReturnType<typeof ticketReducer>
  post: ReturnType<typeof postReducer>
  team: ReturnType<typeof teamReducer>
}

export default rootReducer
