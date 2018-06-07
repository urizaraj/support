import { fetchTicket } from 'actions/ticketActions'
import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import { connect, Dispatch } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { State } from 'reducers'
import { bindActionCreators } from 'redux'

enum status {
  open = 'Open',
  onHold = 'On Hold',
  closed = 'Closed'
}

type TVP = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch> &
  RouteComponentProps<any>

class TicketView extends Component<TVP> {
  id = parseInt(this.props.match.params.id, 10)

  componentDidMount() {
    this.props.fetchTicket(this.id)
  }

  render() {
    const { title, posts } = this.props
    const content = this.props.content ? this.props.content : ''
    return (
      <div>
        <h1>{title}</h1>
        <strong>Ticket</strong> {this.id}
        <br />
        <strong>Priority</strong> {this.props.priority}
        <br />
        <strong>Status</strong> {status[this.props.status]}
        <br />
        <ReactMarkdown source={content} />
        {posts.length < 1 ? <em>no posts</em> : ''}
      </div>
    )
  }
}

const mapState = (state: State) => {
  return {
    ...state.ticket.view
  }
}

const mapDispatch = (dispatch: Dispatch) => {
  const actions = { fetchTicket }
  return bindActionCreators(actions, dispatch)
}

export default connect(
  mapState,
  mapDispatch
)(TicketView)
