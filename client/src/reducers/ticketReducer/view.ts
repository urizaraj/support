import { Ticket, User } from 'types'
import { Team } from 'types/Team'

const initialState = {
  id: 0,
  title: '',
  category: '',
  status: 'open' as 'open',
  priority: 0,
  posts: [],
  content: '',
  user: {} as User,
  team: {} as Team
}

export const view = (state = initialState, action: any): Ticket => {
  switch (action.type) {
    case 'FETCH_TICKET':
      return action.ticket

    default:
      return state
  }
}
