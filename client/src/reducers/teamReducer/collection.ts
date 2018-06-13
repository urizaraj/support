import { Team } from 'types/Team'

const initialState = [] as Team[]

export const collection = (state = initialState, action: any) => {
  switch (action.type) {
    case 'FETCH_TEAMS':
      return action.teams as Team[]

    default:
      return state
  }
}
