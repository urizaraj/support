import { loginAlso } from 'actions/accountActions'
import { Btn, Control } from 'components/elements'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { Change } from 'types'

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

  handleSubmit = () => {
    const { emailAddress, password } = this.state
    this.props.loginAlso(emailAddress, password, this.props.history)
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
        <h1>Log In</h1>

        <h2>emailAddress</h2>

        <this.Email />

        <h2>password</h2>

        <this.Password />

        <Btn dark onClick={this.handleSubmit}>
          Log In
        </Btn>
      </div>
    )
  }
}

const mapDispatch = (dispatch: any) => {
  return bindActionCreators({ loginAlso }, dispatch)
}

export default connect(
  null,
  mapDispatch
)(Login)
