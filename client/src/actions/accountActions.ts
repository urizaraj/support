import { checkResp } from 'functions'
import { Dispatch } from 'react-redux'

export function login(emailAddress: string, password: string, history: any) {
  return (dispatch: any) => {
    const options: RequestInit = {
      method: 'POST',
      body: JSON.stringify({ emailAddress, password }),
      credentials: 'include'
    }

    fetch('/account/login', options)
      .then(checkResp)
      .then(resp => dispatch({ type: 'LOG_IN', user: resp }))
      .then(() => history.push('/'))
      .catch(error => console.log('there was an error', error))
  }
}

export function checkSession() {
  return (dispatch: Dispatch) => {
    return fetch('/account', { credentials: 'include' })
      .then(checkResp)
      .then(resp => dispatch({ type: 'LOG_IN', user: resp }))
      .catch(error => console.log('did not log in'))
  }
}

export function signup(state: any, history: any) {
  return (dispatch: Dispatch) => {
    const options: RequestInit = {
      method: 'POST',
      body: JSON.stringify(state),
      credentials: 'include'
    }

    fetch('/account/signup', options)
      .then(checkResp)
      .then(resp => dispatch({ type: 'LOG_IN', user: resp }))
      .then(() => history.push('/'))
      .catch(error => console.log('there was an error', error))
  }
}

export function logout(event: any) {
  return (dispatch: Dispatch) => {
    event.preventDefault()
    const options: RequestInit = {
      method: 'DELETE',
      credentials: 'include'
    }

    return fetch('/account/logout', options)
      .then(resp => console.log(resp))
      .then(() => dispatch({ type: 'LOGOUT' }))
  }
}
