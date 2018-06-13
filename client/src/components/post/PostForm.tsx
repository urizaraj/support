import { createPost, updatePostForm } from 'actions/postActions'
import { fetchTicket } from 'actions/ticketActions'
import { BCol, Btn, Icon, Radio, Row } from 'components/elements'
import capitalize from 'lodash/capitalize'
import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import { connect, Dispatch } from 'react-redux'
import { State } from 'reducers'
import { bindActionCreators } from 'redux'
import { Change, Submit } from 'types'

type PFP = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>

type PFS = typeof initialState

const initialState = {
  preview: false
}

class PostForm extends Component<PFP, PFS> {
  state = initialState

  handleChange: Change = event => {
    const { name, value } = event.target
    this.props.updatePostForm({ [name]: value })
  }

  handleSubmit: Submit = event => {
    event.preventDefault()
    this.props.createPost()
  }

  togglePreview = () => this.setState(({ preview }) => ({ preview: !preview }))

  categoryRadio = ({ value }: { value: string }) => {
    const checked = this.props.category === value

    const props = {
      name: 'category',
      value,
      checked,
      handleChange: this.handleChange
    }

    return (
      <Radio {...props}>
        <div className="pb-1">
          <Icon icon={checked ? 'check' : 'media-record'} />
        </div>
        {capitalize(value)}
      </Radio>
    )
  }

  render() {
    const { preview } = this.state

    return (
      <form onSubmit={this.handleSubmit}>
        <Row opt="mb-3 align-items-center">
          <BCol size="auto">
            <h5>Category</h5>
          </BCol>

          <BCol size="auto" opt="text-center">
            <this.categoryRadio value="post" />
          </BCol>

          <BCol size="auto" opt="text-center">
            <this.categoryRadio value="resolution" />
          </BCol>
        </Row>

        <Row opt="align-items-center mb-2">
          <BCol size="auto">
            <h5 className="mb-0">Content</h5>
          </BCol>
          <BCol size="auto">
            <Btn sm primary onClick={this.togglePreview}>
              Preview
            </Btn>
          </BCol>
        </Row>

        {preview ? (
          <div className="p-3 ">
            <ReactMarkdown source={this.props.content} />
          </div>
        ) : (
          <div className="form-group">
            <textarea
              className="form-control"
              name="content"
              value={this.props.content}
              onChange={this.handleChange}
            />
          </div>
        )}

        <Btn primary submit>
          Submit Post
        </Btn>
      </form>
    )
  }
}

const mapState = (state: State) => ({ ...state.post.form })

const mapDispatch = (dispatch: Dispatch) => {
  const actions = { updatePostForm, createPost, fetchTicket }
  return bindActionCreators(actions, dispatch)
}

export default connect(
  mapState,
  mapDispatch
)(PostForm)
