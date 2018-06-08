const initialState = {
  signedIn: false
}

interface US {
  id?: number
  name?: string
  email?: string
}

type AR = typeof initialState & US

interface A {
  type: string
  user?: US
}

const accountReducer = (state = initialState, action: A): AR => {
  switch (action.type) {
    case 'LOG_IN':
      return {
        signedIn: true,
        ...action.user
      }

    case 'LOGOUT':
      return initialState

    default:
      return state
  }
}

export default accountReducer
