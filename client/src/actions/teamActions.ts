import { checkResp } from 'functions'
import { Dispatch } from 'react-redux'

export function fetchTeams() {
  return (dispatch: Dispatch) => {
    return fetch('/team')
      .then(checkResp)
      .then(resp =>
        dispatch({
          type: 'FETCH_TEAMS',
          teams: resp
        })
      )
      .catch(err => console.log('error fetching teams', err))
  }
}
