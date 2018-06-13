import { fetchTickets } from 'actions/ticketActions'
import { DFlex } from 'components/elements'
import sortBy from 'lodash/sortBy'
import React, { Component } from 'react'
import { connect, Dispatch } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'
import { State } from 'reducers'
import { bindActionCreators } from 'redux'
import { Ticket } from 'types'

type TIP = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch> &
  RouteComponentProps<any>

class TicketIndex extends Component<TIP> {
  componentDidMount() {
    this.props.fetchTickets()
  }

  render() {
    const tickets = sortBy(this.props.tickets, t => t.priority)
    const ticketList = tickets.map(TicketListItem)
    return <div>{ticketList}</div>
  }
}

const TicketListItem = (ticket: Ticket) => {
  const { id, title, priority } = ticket
  const url = `/tickets/${id}`

  return (
    <div key={id} className="mb-3">
      <Link to={url}>
        <DFlex>
          <h5 className="mr-2">{priority}</h5>
          <h5>{title}</h5>
        </DFlex>
      </Link>
    </div>
  )
}

const mapState = (state: State) => {
  return {
    tickets: state.ticket.collection
  }
}

const mapDispatch = (dispatch: Dispatch) => {
  const actions = { fetchTickets }
  return bindActionCreators(actions, dispatch)
}

export default connect(
  mapState,
  mapDispatch
)(TicketIndex)
