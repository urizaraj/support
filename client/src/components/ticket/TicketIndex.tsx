import { fetchTickets } from 'actions/ticketActions'
import { BCol, DFlex, Row } from 'components/elements'
import sortBy from 'lodash/sortBy'
import uniq from 'lodash/uniq'
import React, { Component } from 'react'
import { connect, Dispatch } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'
import { State } from 'reducers'
import { bindActionCreators } from 'redux'
import { Ticket } from 'types'
import { Team } from 'types/Team'

const initialState = {
  team: 0
}

type TIP = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch> &
  RouteComponentProps<any>

type TIS = typeof initialState

class TicketIndex extends Component<TIP, TIS> {
  state = initialState

  componentDidMount() {
    this.props.fetchTickets()
  }

  handleTeam = (event: any) => {
    this.setState({ team: parseInt(event.target.value, 10) })
  }

  render() {
    let tickets = sortBy(this.props.tickets, t => t.priority)

    const teams = uniq(tickets.map(t => [t.team.id, t.team.name]))

    if (this.state.team) {
      tickets = tickets.filter(t => t.team.id === this.state.team)
    }

    const ticketList = tickets.map(TicketListItem)

    return (
      <div>
        <h2>Tickets</h2>
        <div className="mb-3">
          <select
            value={this.state.team}
            onChange={this.handleTeam}
            className="form-control"
          >
            <option value="0">All</option>
            {teams.map(t => (
              <option key={t[0]} value={t[0]}>
                {t[1]}
              </option>
            ))}
          </select>
        </div>
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
