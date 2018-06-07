import { BCol, DFlex, Icon, Row } from 'components/elements'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { State } from 'reducers'
import { bindActionCreators } from 'redux'

type NB = ReturnType<typeof mapState>

const Navbar = (props: NB) => {
  return (
    <Row opt="mb-3">
      <BCol size="auto">
        <Link to="/">Home</Link>
      </BCol>

      <BCol size="auto">
        <Link to="/tickets">Tickets</Link>
      </BCol>

      <BCol size="auto">
        <Link to="/tickets/new">New Ticket</Link>
      </BCol>

      <BCol size="auto">
        <Link to="/viewer">View Icons</Link>
      </BCol>

      {props.signedIn ? (
        <BCol size="auto">{props.name}</BCol>
      ) : (
        <React.Fragment>
          <BCol size="auto">
            <Link to="/account/signup">Sign Up</Link>
          </BCol>
          <BCol size="auto">
            <Link to="/account/login">Log In</Link>
          </BCol>
        </React.Fragment>
      )}
    </Row>
  )
}

const mapState = (state: State) => ({ ...state.account })

export default connect(mapState)(Navbar)
