const initialState = {
  name: '',
  emailAddress: '',
  password: ''
}

type UF = typeof initialState

const form = (state = initialState, action: any): UF => {
  switch (action.type) {
    case 'UPDATE_USER_FORM':
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

export default form
