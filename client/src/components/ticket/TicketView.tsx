import {
  deleteTicket,
  fetchTicket,
  patchTicketStatus
} from 'actions/ticketActions'
import { Btn } from 'components/elements'
import PostForm from 'components/post/PostForm'
import React, { Component } from 'react'
import { Collapse } from 'react-collapse'
import ReactMarkdown from 'react-markdown'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { State } from 'reducers'
import { bindActionCreators, Dispatch } from 'redux'
import { Click, Post } from 'types'

enum status {
  open = 'Open',
  onHold = 'On Hold',
  closed = 'Closed'
}

const initialState = {
  newPost: false
}

type TVP = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch> &
  RouteComponentProps<any>

type TVS = typeof initialState

class TicketView extends Component<TVP, TVS> {
  id = this.props.match.params.id
  state = initialState

  componentDidMount() {
    this.props.fetchTicket(this.id)
  }

  toggleNewPost = () => this.setState(({ newPost }) => ({ newPost: !newPost }))

  handleDelete: Click = event => {
    event.preventDefault()
    this.props.deleteTicket(this.id)
    this.props.history.push('/tickets')
  }

  handleClose: Click = event => {
    event.preventDefault()
    this.props.patchTicketStatus('closed', this.id)
  }

  handleOpen: Click = event => {
    event.preventDefault()
    this.props.patchTicketStatus('open', this.id)
  }

  render() {
    const { title, posts, user, priority, team } = this.props
    const content = this.props.content ? this.props.content : ''
    const open = this.props.status === 'open'
    const { newPost } = this.state

    return (
      <div>
        <h1>{title}</h1>
        <strong>Created by</strong> {user.name}
        <br />
        <strong>Ticket</strong> {this.id}
        <br />
        <strong>Priority</strong> {priority}
        <br />
        <strong>Status</strong> {status[this.props.status]}
        <br />
        <strong>Team</strong> {team.name} <br />
        <a className="btn btn-danger" href="/" onClick={this.handleDelete}>
          Delete
        </a>{' '}
        {open ? (
          <a className="btn btn-primary" href="/" onClick={this.handleClose}>
            Close Ticket
          </a>
        ) : (
          <a className="btn btn-primary" href="/" onClick={this.handleOpen}>
            Re-open Ticket
          </a>
        )}
        <hr />
        {content ? <ReactMarkdown source={content} /> : <em>no description</em>}
        <hr />
        {posts.length < 1 ? <em>no posts</em> : postList(posts)}
        <hr />
        {/* <h4 onClick={this.toggleNewPost}>New Post</h4> */}
        <Btn onClick={this.toggleNewPost} primary active={newPost}>
          New Post
        </Btn>
        <Collapse isOpened={newPost}>
          <PostForm toggleNewPost={this.toggleNewPost} />
        </Collapse>
      </div>
    )
  }
}

const postList = (posts: Post[]) =>
  posts.map(post => {
    const { content, category, id, user } = post
    return (
      <div key={id}>
        <strong>{user.name}</strong>
        <ReactMarkdown source={content} />
      </div>
    )
  })

const mapState = (state: State) => {
  return {
    ...state.ticket.view
  }
}

const mapDispatch = (dispatch: Dispatch) => {
  const actions = { fetchTicket, deleteTicket, patchTicketStatus }
  return bindActionCreators(actions, dispatch)
}

export default connect(
  mapState,
  mapDispatch
)(TicketView)
