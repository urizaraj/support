import { History } from 'history'
import { State } from 'reducers'
import { Dispatch } from 'redux'

export function updateTicketForm(payload: any) {
  return {
    type: 'UPDATE_TICKET_FORM',
    payload
  }
}

export function createTicket(history: History) {
  return (dispatch: Dispatch, getState: () => State) => {
    const state = getState()
    const options = {
      method: 'POST',
      body: JSON.stringify(state.ticket.form)
    }

    return fetch('/ticket', options)
      .then(resp => {
        if (resp.ok) {
          return resp.json()
        } else {
          throw new Error()
        }
      })
      .then(resp => history.push(`/tickets/${resp.id}`))
      .catch(err => console.log('error', err))
  }
}

export function fetchTickets() {
  return (dispatch: Dispatch) => {
    return fetch('/ticket')
      .then(resp => {
        if (resp.ok) {
          return resp.json()
        } else {
          throw new Error()
        }
      })
      .then(resp =>
        dispatch({
          type: 'FETCH_TICKETS',
          tickets: resp
        })
      )
      .catch(err => console.log('error', err))
  }
}

export function fetchTicket(id: number) {
  return (dispatch: Dispatch) => {
    return fetch(`/ticket/${id}`)
      .then(resp => {
        if (resp.ok) {
          return resp.json()
        } else {
          throw new Error()
        }
      })
      .then(resp =>
        dispatch({
          type: 'FETCH_TICKET',
          ticket: resp
        })
      )
      .catch(err => console.log('error', err))
  }
}
