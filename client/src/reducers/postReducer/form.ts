const initialState = {
  content: '',
  category: 'post',
  ticket: 0
}

type PRF = typeof initialState

export const form = (state = initialState, action: any): PRF => {
  switch (action.type) {
    case 'UPDATE_POST_FORM':
      return { ...state, ...action.post }
    default:
      return state
  }
}
