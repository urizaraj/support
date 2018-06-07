import { Ticket } from 'types'

const initialState = [] as Ticket[]

export const collection = (state = initialState, action: any) => {
  switch (action.type) {
    case 'FETCH_TICKETS':
      return action.tickets as Ticket[]
    default:
      return state
  }
}
