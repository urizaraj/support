import { fetchTeams } from 'actions/teamActions'
import { fetchTickets } from 'actions/ticketActions'
import { BCol, Row } from 'components/elements'
import sortBy from 'lodash/sortBy'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'
import { State } from 'reducers'
import { bindActionCreators, Dispatch } from 'redux'
import { Ticket } from 'types'

const initialState = {
  team: ''
}

type TIP = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch> &
  RouteComponentProps<any>

type TIS = typeof initialState

class TicketIndex extends Component<TIP, TIS> {
  state = initialState

  componentDidMount() {
    this.props.fetchTickets()
    this.props.fetchTeams()
  }

  handleTeam = (event: any) => {
    this.setState({ team: event.target.value })
  }

  render() {
    let tickets = sortBy(this.props.tickets, t => t.priority)

    // const teams = uniqBy(tickets.map(t => ({ ...t.team })), 'id')

    const { teams } = this.props

    if (this.state.team) {
      tickets = tickets.filter(t => t.team.id === this.state.team)
    }

    const ticketList = tickets.map(TicketListItem)

    return (
      <div>
        <Row opt="mb-4 align-items-end">
          <BCol>
            <h2 className="mb-0">Tickets</h2>
          </BCol>

          <BCol opt="ml-auto" size="3">
            <select
              value={this.state.team}
              onChange={this.handleTeam}
              className="form-control"
            >
              <option value="">All</option>
              {teams.map(t => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </BCol>
        </Row>

        {ticketList}
      </div>
    )
  }
}

const TicketListItem = (ticket: Ticket) => {
  const { id, title, priority, team, user } = ticket
  const url = `/tickets/${id}`

  return (
    <div key={id} className="mb-3">
      <Row>
        <BCol size="1">
          <h5>{priority}</h5>
        </BCol>

        <BCol size="5">
          <Link to={url}>
            <h5>{title}</h5>
          </Link>
        </BCol>

        <BCol size="3">
          <h5>{team.name}</h5>
        </BCol>

        <BCol size="3">{/* <h6>{user.name}</h6> */}</BCol>
      </Row>
    </div>
  )
}

const mapState = (state: State) => {
  return {
    tickets: state.ticket.collection,
    teams: state.team.collection
  }
}

const mapDispatch = (dispatch: Dispatch) => {
  const actions = { fetchTickets, fetchTeams }
  return bindActionCreators(actions, dispatch)
}

export default connect(
  mapState,
  mapDispatch
)(TicketIndex)
