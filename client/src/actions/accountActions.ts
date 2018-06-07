import { Dispatch } from 'react-redux'
import { State } from 'reducers'

export function login() {
  return (dispatch: any, getState: any) => {
    const state = getState() as State
  }
}

export function loginAlso(
  emailAddress: string,
  password: string,
  history: any
) {
  return (dispatch: any) => {
    const options: RequestInit = {
      method: 'POST',
      body: JSON.stringify({ emailAddress, password }),
      credentials: 'include'
    }

    fetch('/account/login', options)
      .then(resp => {
        if (resp.ok) {
          return resp.json()
        } else {
          throw new Error()
        }
      })

      .then(resp => {
        dispatch({
          type: 'LOG_IN',
          user: resp
        })

        history.push('/')
      })

      .catch(error => {
        console.log('there was an error', error)
      })
  }
}

export function checkSession() {
  return (dispatch: Dispatch) => {
    return fetch('/account', { credentials: 'include' })
      .then(resp => {
        if (resp.ok) {
          return resp.json()
        } else {
          throw new Error()
        }
      })

      .then(resp => dispatch({ type: 'LOG_IN', user: resp }))

      .catch(error => console.log('did not log in'))
  }
}
