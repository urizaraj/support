import { checkResp, post } from 'functions'
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
    const ticket = {
      ...state.ticket.form,
      user: state.account.id
    }

    return post('/ticket', ticket)
      .then(checkResp)
      .then(resp => history.push(`/tickets/${resp.id}`))
      .catch(err => console.log('error creating ticket', err))
  }
}

export function fetchTickets() {
  return (dispatch: Dispatch) => {
    return fetch('/ticket')
      .then(checkResp)
      .then(resp =>
        dispatch({
          type: 'FETCH_TICKETS',
          tickets: resp
        })
      )
      .catch(err => console.log('error fetching tickets', err))
  }
}

export function fetchTicket(id: string) {
  return (dispatch: Dispatch) => {
    return fetch(`/ticket/${id}`)
      .then(checkResp)
      .then(ticket => dispatch({ type: 'FETCH_TICKET', ticket }))
      .catch(err => console.log('error fetching ticket', err))
  }
}

export function deleteTicket(id: string) {
  return (dispatch: Dispatch) => {
    const options = {
      method: 'DELETE'
    }

    return fetch(`/ticket/${id}`, options)
      .then(checkResp)
      .then(resp => console.log(resp))
  }
}

export function patchTicketStatus(
  status: 'open' | 'onHold' | 'closed',
  id: number
) {
  return (dispatch: Dispatch) => {
    const options = {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ status })
    }

    return fetch(`/ticket/${id}`, options)
      .then(checkResp)
      .then(resp => dispatch({ type: 'FETCH_TICKET', ticket: resp }))
      .catch(err => console.log('error updating ticket', err))
  }
}
