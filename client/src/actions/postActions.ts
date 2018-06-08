import { fetchTicket } from 'actions/ticketActions'
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
    const post = {
      ...state.post.form,
      ticket: ticketId
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(post)
    }

    return fetch('/post', options)
      .then(resp => {
        if (resp.ok) {
          return resp.json()
        } else {
          throw new Error()
        }
      })
      .then(() => fetchTicket(ticketId))
      .catch(err => console.log('error creating ticket', err))
  }
}
