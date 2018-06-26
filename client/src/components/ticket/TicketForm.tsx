import { fetchTeams } from 'actions/teamActions'
import { createTicket, updateTicketForm } from 'actions/ticketActions'
import {
  BCol,
  Btn,
  Control,
  DFlex,
  Icon,
  Radio,
  Row
} from 'components/elements'
import capitalize from 'lodash/capitalize'
import React, { ChangeEvent, Component } from 'react'
import ReactMarkdown from 'react-markdown'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { State } from 'reducers'
import { bindActionCreators, Dispatch } from 'redux'
import { Change, Submit } from 'types'

type TFP = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch> &
  RouteComponentProps<any>

type TFS = typeof initialState

const initialState = {
  preview: false
}

type SEC = ((event: ChangeEvent<HTMLSelectElement>) => void)

class TicketForm extends Component<TFP, TFS> {
  state = initialState

  handleChange: Change = event => {
    const { name, value } = event.target
    this.props.updateTicketForm({ [name]: value })
  }

  handlePriority: Change = event => {
    const priority = parseInt(event.target.value, 10)
    this.props.updateTicketForm({ priority })
  }

  handleSubmit: Submit = event => {
    event.preventDefault()
    this.props.createTicket(this.props.history)
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

  handleSelect: SEC = event => {
    const { name, value } = event.target
    this.props.updateTicketForm({ [name]: value })
  }

  componentDidMount() {
    this.props.fetchTeams()
  }

  render() {
    const { preview } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <h5>Title</h5>

        <Control
          name="title"
          value={this.props.title}
          handleChange={this.handleChange}
        />

        <Row opt="mb-3 align-items-center">
          <BCol size="auto">
            <h5>Category</h5>
          </BCol>
          <BCol size="auto" opt="text-center">
            <this.categoryRadio value="issue" />
          </BCol>

          <BCol size="auto" opt="text-center">
            <this.categoryRadio value="question" />
          </BCol>
        </Row>

        <DFlex center>
          <h5 className="mr-1">Priority</h5>
          {[1, 2, 3].map(n => {
            const checked = this.props.priority === n
            return (
              <Radio
                key={n}
                name="priority"
                value={n}
                checked={checked}
                handleChange={this.handlePriority}
              >
                <div className={checked ? 'bg-primary p-3 text-white' : 'p-3'}>
                  {n}
                </div>
              </Radio>
            )
          })}
        </DFlex>

        <h5>Team</h5>
        <div className="form-group">
          <select
            name="team"
            value={this.props.team}
            onChange={this.handleSelect}
            className="form-control"
          >
            {this.props.teams.map(t => {
              return (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              )
            })}
          </select>
        </div>

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
          Create Ticket
        </Btn>
      </form>
    )
  }
}

const mapState = (state: State) => {
  return {
    ...state.ticket.form,
    teams: state.team.collection
  }
}

const mapDispatch = (dispatch: Dispatch) => {
  const actions = { updateTicketForm, createTicket, fetchTeams }
  return bindActionCreators(actions, dispatch)
}

export default connect(
  mapState,
  mapDispatch
)(TicketForm)
