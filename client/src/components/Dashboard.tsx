import { fetchTicketsUnassigned } from 'actions/ticketActions'
import DashboardTicket from 'components/DashboardTicket'
import { BCol, Btn, Row } from 'components/elements'
import React, { Component } from 'react'
import { Manager, Popper, Reference } from 'react-popper'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { State } from 'reducers'
import { bindActionCreators, Dispatch } from 'redux'

type DP = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch> &
  RouteComponentProps<any>

class Dashboard extends Component<DP> {
  componentDidMount() {
    this.props.fetchTicketsUnassigned()
  }

  render() {
    const { tickets } = this.props

    const ticketList = tickets.map(ticket => (
      <DashboardTicket {...ticket} key={ticket.id} />
    ))

    return (
      <div>
        <h1>Dashboard</h1>
        <h3>Unassigned Tickets</h3>
        {ticketList}
      </div>
    )
  }
}

const mapState = (state: State) => {
  return {
    tickets: state.ticket.collection
  }
}

const mapDispatch = (dispatch: Dispatch) => {
  const actions = { fetchTicketsUnassigned }
  return bindActionCreators(actions, dispatch)
}

export default connect(
  mapState,
  mapDispatch
)(Dashboard)
