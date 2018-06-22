import { signup } from 'actions/accountActions'
import { Btn, Control } from 'components/elements'
import React, { Component } from 'react'
import { connect, Dispatch } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { Submit } from 'types'

type SUP = RouteComponentProps<any> & ReturnType<typeof mapDispatch>

class Signup extends Component<SUP, any> {
  constructor(props: any) {
    super(props)

    this.state = {
      name: '',
      email: '',
      password: ''
    }
  }

  handleChange = (event: any) => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit: Submit = event => {
    event.preventDefault()
    this.props.signup(this.state, this.props.history)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Sign Up</h1>
          <h2>Name</h2>
          <Control
            name="name"
            value={this.state.name}
            handleChange={this.handleChange}
          />

          <h2>Email</h2>
          <Control
            name="email"
            type="email"
            value={this.state.email}
            handleChange={this.handleChange}
          />

          <h2>Password</h2>
          <Control
            type="password"
            name="password"
            value={this.state.password}
            handleChange={this.handleChange}
          />

          <Btn dark submit>
            Sign Up
          </Btn>
        </form>
      </div>
    )
  }
}

const mapDispatch = (dispatch: Dispatch) => {
  const actions = { signup }
  return bindActionCreators(actions, dispatch)
}

export default connect(
  null,
  mapDispatch
)(Signup)
