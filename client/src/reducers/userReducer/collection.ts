import { User } from 'types'

const initialState = [] as User[]

export const collection = (state = initialState, action: any) => {
  switch (action.type) {
    case 'FETCH_USERS':
      return action.tickets as User[]
    default:
      return state
  }
}
