import { logout } from 'actions/accountActions'
import { BCol, Btn, DFlex, Icon, Row } from 'components/elements'
import React, { Component } from 'react'
import { connect, Dispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { State } from 'reducers'
import { bindActionCreators } from 'redux'

type NB = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>

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
        <Link to="/teams/new">New Team</Link>
      </BCol>

      <BCol size="auto">
        <Link to="/viewer">View Icons</Link>
      </BCol>

      {props.signedIn ? (
        <React.Fragment>
          <BCol size="auto">{props.name}</BCol>
          <BCol>
            <a href="#" onClick={props.logout}>
              Log out
            </a>
          </BCol>
        </React.Fragment>
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

const mapDispatch = (dispatch: Dispatch) => {
  const actions = { logout }
  return bindActionCreators(actions, dispatch)
}

export default connect(
  mapState,
  mapDispatch
)(Navbar)
