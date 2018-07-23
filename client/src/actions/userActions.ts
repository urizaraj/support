import { checkResp } from 'functions'
import { Dispatch } from 'redux'

export function fetchUsers() {
  return (dispatch: Dispatch) => {
    return fetch('/user')
      .then(checkResp)
      .then(resp =>
        dispatch({
          type: 'FETCH_USERS',
          users: resp
        })
      )
      .catch(err => console.log('error fetching users', err))
  }
}
