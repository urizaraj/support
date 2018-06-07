import { Btn, Control } from 'components/elements'
import React, { Component } from 'react'

class Signup extends Component<any, any> {
  constructor(props: any) {
    super(props)

    this.state = {
      name: '',
      emailAddress: '',
      password: ''
    }
  }

  handleChange = (event: any) => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = () => {
    const options = {
      method: 'POST',
      body: JSON.stringify(this.state),
      credentials: 'include'
    }

    fetch('/account/signup', options as RequestInit)
      .then(resp => {
        if (resp.ok) {
          return resp.json()
        } else {
          throw new Error()
        }
      })
      .then(console.log)
      .catch(error => {
        console.log('there was an error', error)
      })
  }

  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <h2>name</h2>
        <Control
          name="name"
          value={this.state.name}
          handleChange={this.handleChange}
        />

        <h2>emailAddress</h2>
        <Control
          name="emailAddress"
          type="email"
          value={this.state.emailAddress}
          handleChange={this.handleChange}
        />

        <h2>password</h2>
        <Control
          type="password"
          name="password"
          value={this.state.password}
          handleChange={this.handleChange}
        />

        <Btn dark onClick={this.handleSubmit}>
          Sign Up
        </Btn>
      </div>
    )
  }
}

export default Signup
