import { fetchTickets } from 'actions/ticketActions'
import { DFlex } from 'components/elements'
import React, { Component } from 'react'
import { connect, Dispatch } from 'react-redux'
import { Link, RouteComponentProps } from 'react-router-dom'
import { State } from 'reducers'
import { bindActionCreators } from 'redux'

type TIP = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch> &
  RouteComponentProps<any>

class TicketIndex extends Component<TIP> {
  componentDidMount() {
    this.props.fetchTickets()
  }

  render() {
    return (
      <div>
        {this.props.tickets.map(t => (
          <div key={t.id} className="mb-3">
            <DFlex>
              <h5 className="mr-2">{t.priority}</h5>
              <h5>{t.title}</h5>
            </DFlex>
            <Link to={`/tickets/${t.id}`}>Link</Link>
          </div>
        ))}
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
  const actions = { fetchTickets }
  return bindActionCreators(actions, dispatch)
}

export default connect(
  mapState,
  mapDispatch
)(TicketIndex)
