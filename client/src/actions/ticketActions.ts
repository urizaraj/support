import { checkResp } from 'functions'
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
    const options = {
      method: 'POST',
      body: JSON.stringify(ticket)
    }

    return fetch('/ticket', options)
      .then(checkResp)
      .then(resp => history.push(`/tickets/${resp.id}`))
      .catch(err => console.log('error', err))
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
      .catch(err => console.log('error', err))
  }
}

export function fetchTicket(id: number) {
  return (dispatch: Dispatch) => {
    return fetch(`/ticket/${id}`)
      .then(checkResp)
      .then(resp =>
        dispatch({
          type: 'FETCH_TICKET',
          ticket: resp
        })
      )
      .catch(err => console.log('error', err))
  }
}

export function deleteTicket(id: number) {
  return (dispatch: Dispatch) => {
    const options = {
      method: 'DELETE'
    }

    return fetch(`/ticket/${id}`, options)
      .then(checkResp)
      .then(resp => console.log(resp))
  }
}
