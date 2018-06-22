import {
  deleteTicket,
  fetchTicket,
  patchTicketStatus
} from 'actions/ticketActions'
import { Btn } from 'components/elements'
import PostForm from 'components/post/PostForm'
import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import { connect, Dispatch } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { State } from 'reducers'
import { bindActionCreators } from 'redux'
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
    const { title, posts } = this.props
    const content = this.props.content ? this.props.content : ''
    const open = this.props.status === 'open'
    return (
      <div>
        <h1>{title}</h1>
        <strong>Ticket</strong> {this.id}
        <br />
        <strong>Priority</strong> {this.props.priority}
        <br />
        <strong>Status</strong> {status[this.props.status]}
        <br />
        <strong>Team</strong> {this.props.team.name} <br />
        <strong>Created by</strong> {this.props.user.name}
        <br />
        <a href="#" onClick={this.handleDelete}>
          Delete
        </a>{' '}
        {open ? (
          <a href="#" onClick={this.handleClose}>
            Close Ticket
          </a>
        ) : (
          <a href="#" onClick={this.handleOpen}>
            Re-open Ticket
          </a>
        )}
        <hr />
        {content ? <ReactMarkdown source={content} /> : <em>no description</em>}
        <hr />
        {posts.length < 1 ? <em>no posts</em> : postList(this.props.posts)}
        <hr />
        {this.state.newPost ? (
          <div>
            <h4>New Post</h4>
            <PostForm />
          </div>
        ) : (
          <Btn primary onClick={this.toggleNewPost}>
            New Post
          </Btn>
        )}
      </div>
    )
  }
}

const postList = (posts: Post[]) =>
  posts.map(post => {
    const { content, category, id } = post
    return (
      <div key={id}>
        <strong>{category}</strong>
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
