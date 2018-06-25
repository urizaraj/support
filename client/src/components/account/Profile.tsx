import { fetchTeams } from 'actions/teamActions'
import { BCol, Check, Row } from 'components/elements'
import includes from 'lodash/includes'
import xor from 'lodash/xor'
import React, { Component } from 'react'
import { connect, Dispatch } from 'react-redux'
import { State } from 'reducers'
import { bindActionCreators } from 'redux'
import { Change } from 'types'

type ProPr = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>

const initialState = {
  selectedTeams: [] as string[]
}

type ProSt = Readonly<typeof initialState>

class Profile extends Component<ProPr, ProSt> {
  state = initialState

  componentDidMount() {
    this.props.fetchTeams()
  }

  handleChange: Change = event => {
    const value = event.target.value
    this.setState(pre => ({
      selectedTeams: xor(pre.selectedTeams, [value])
    }))
  }

  render() {
    const { teams } = this.props
    return (
      <div>
        <h6>Teams</h6>
        <Row>
          {teams.map(team => {
            const checked = includes(this.state.selectedTeams, team.id)
            return (
              <BCol key={team.id} size="auto">
                <Check
                  name="teams"
                  value={team.id}
                  checked={checked}
                  handleChange={this.handleChange}
                >
                  <span className={checked ? 'text-primary' : ''}>
                    {team.name}
                  </span>
                </Check>
              </BCol>
            )
          })}
        </Row>
      </div>
    )
  }
}

const mapState = (state: State) => {
  return {
    teams: state.team.collection
  }
}

const mapDispatch = (dispatch: Dispatch) => {
  const actions = { fetchTeams }
  return bindActionCreators(actions, dispatch)
}

export default connect(
  mapState,
  mapDispatch
)(Profile)
