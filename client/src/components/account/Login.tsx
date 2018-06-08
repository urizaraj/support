import { login } from 'actions/accountActions'
import { Btn, Control } from 'components/elements'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { Change, Submit } from 'types'

const initialState = {
  emailAddress: '',
  password: ''
}

type LTP = ReturnType<typeof mapDispatch> & { history: any }

class Login extends Component<LTP, typeof initialState> {
  constructor(props: LTP) {
    super(props)
    this.state = initialState
  }

  handleChange: Change = event => {
    const { name, value } = event.target
    this.setState({
      [name as 'password']: value
    })
  }

  handleSubmit: Submit = event => {
    event.preventDefault()
    const { emailAddress, password } = this.state
    this.props.login(emailAddress, password, this.props.history)
  }

  createControl(name: string, type = 'text') {
    return (
      <Control
        name={name}
        type={type}
        value={this.state[name]}
        handleChange={this.handleChange}
      />
    )
  }

  Email = () => this.createControl('emailAddress', 'email')
  Password = () => this.createControl('password', 'password')

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Log In</h1>

          <h2>emailAddress</h2>

          <this.Email />

          <h2>password</h2>

          <this.Password />

          <Btn dark submit>
            Log In
          </Btn>
        </form>
      </div>
    )
  }
}

const mapDispatch = (dispatch: any) => {
  return bindActionCreators({ login }, dispatch)
}

export default connect(
  null,
  mapDispatch
)(Login)
