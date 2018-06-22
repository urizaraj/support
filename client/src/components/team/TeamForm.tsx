import { Btn, Control } from 'components/elements'
import { checkResp, post } from 'functions'
import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Change, Submit } from 'types'

const initialState = {
  name: ''
}

type TFS = typeof initialState
type TFP = RouteComponentProps<any>

class TeamForm extends Component<TFP, TFS> {
  state = initialState

  handleChange: Change = event => {
    const { name, value } = event.target
    this.setState({ [name as 'name']: value })
  }

  handleSubmit: Submit = event => {
    event.preventDefault()

    post('/team', this.state)
      .then(checkResp)
      .then(() => this.props.history.push('/'))
      .catch(() => console.log('team not created'))
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h4>Team Name</h4>
        <Control
          name="name"
          value={this.state.name}
          handleChange={this.handleChange}
        />

        <Btn success submit>
          Create Team
        </Btn>
      </form>
    )
  }
}

export default TeamForm
