import { Btn, Control, DFlex } from 'components/elements'
import { checkResp, post } from 'functions'
import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Change, Click, Submit } from 'types'
import { Team } from 'types/Team'

const initialState = {
  form: { name: '' },
  teams: [] as Team[]
}

type TFS = typeof initialState
type TFP = RouteComponentProps<any>

class TeamForm extends Component<TFP, TFS> {
  state = initialState

  handleChange: Change = event => {
    const { name, value } = event.target
    this.setState(preState => ({
      ...preState,
      form: {
        name: value
      }
    }))
  }

  handleSubmit: Submit = event => {
    event.preventDefault()

    post('/team', this.state.form)
      .then(checkResp)
      .then(() => this.props.history.push('/'))
      .catch(() => console.log('team not created'))
  }

  handleDelete: Click = event => {
    event.preventDefault()
    event.persist()
    const e = event as any
    fetch(`/team/${e.target.value}`, { method: 'DELETE' })
  }

  fetchTeams = () => {
    fetch('/team')
      .then(checkResp)
      .then(resp => this.setState({ teams: resp }))
      .catch(() => console.log('teams not fetched'))
  }

  componentDidMount() {
    this.fetchTeams()
  }

  render() {
    const teams = this.state.teams.map(team => {
      return (
        <DFlex key={team.id} center>
          <div className="mr-3">{team.id}</div>
          <div className="mb-0 mr-auto h6">{team.name}</div>
          <Btn danger sm onClick={this.handleDelete} value={team.id}>
            Delete
          </Btn>
        </DFlex>
      )
    })

    return (
      <div>
        <h4>Current Teams</h4>
        {teams}
        <form onSubmit={this.handleSubmit}>
          <h4>Team Name</h4>
          <Control
            name="name"
            value={this.state.form.name}
            handleChange={this.handleChange}
          />

          <Btn success submit>
            Create Team
          </Btn>
        </form>
      </div>
    )
  }
}

export default TeamForm
