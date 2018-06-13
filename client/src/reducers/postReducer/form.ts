const initialState = {
  content: '',
  category: 'post'
}

type PRF = typeof initialState

export const form = (state = initialState, action: any): PRF => {
  switch (action.type) {
    case 'UPDATE_POST_FORM':
      return { ...state, ...action.post }

    case 'RESET_POST_FORM':
      return initialState

    default:
      return state
  }
}
