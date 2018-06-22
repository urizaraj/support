import { fetchTicket } from 'actions/ticketActions'
import { checkResp } from 'functions'
import { State } from 'reducers'
import { Dispatch } from 'redux'

export function updatePostForm(payload: any) {
  return {
    type: 'UPDATE_POST_FORM',
    post: payload
  }
}

export function createPost() {
  return (dispatch: Dispatch, getState: () => State) => {
    const state = getState()

    const ticketId = state.ticket.view.id
    const userId = state.account.id
    const post = {
      ...state.post.form,
      ticketId,
      user: userId
    }

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(post)
    }

    return fetch('/post', options)
      .then(checkResp)
      .then(() => dispatch({ type: 'RESET_POST_FORM' }))
      .then(() => fetchTicket(ticketId)(dispatch))
      .catch(err => console.log('error creating post', err))
  }
}
