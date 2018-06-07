const initialState = {
  title: '',
  category: '',
  priority: 3
}

type TS = typeof initialState

export const form = (state = initialState, action: any): TS => {
  switch (action.type) {
    case 'UPDATE_TICKET_FORM':
      return {
        ...state,
        ...action.payload
      }

    default:
      return state
  }
}
