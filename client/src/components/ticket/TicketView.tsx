import { fetchTicket } from 'actions/ticketActions'
import { Btn } from 'components/elements'
import PostForm from 'components/post/PostForm'
import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import { connect, Dispatch } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { State } from 'reducers'
import { bindActionCreators } from 'redux'
import { Post } from 'types'

enum status {
  open = 'Open',
  onHold = 'On Hold',
  closed = 'Closed'
}

const initialState = {
  showNewPost: false
}

type TVP = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch> &
  RouteComponentProps<any>

type TVS = typeof initialState

class TicketView extends Component<TVP, TVS> {
  id = parseInt(this.props.match.params.id, 10)
  state = initialState

  componentDidMount() {
    this.props.fetchTicket(this.id)
  }

  toggleNewPost = () => this.setState({ showNewPost: !this.state.showNewPost })

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
        <strong>Created by</strong> {this.props.user.name}
        <hr />
        {content ? <ReactMarkdown source={content} /> : <em>no description</em>}
        <hr />
        {posts.length < 1 ? <em>no posts</em> : postList(this.props.posts)}
        <hr />
        {this.state.showNewPost ? (
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
  const actions = { fetchTicket }
  return bindActionCreators(actions, dispatch)
}

export default connect(
  mapState,
  mapDispatch
)(TicketView)
