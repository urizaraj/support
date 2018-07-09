import Login from 'components/account/Login'
import Profile from 'components/account/Profile'
import Signup from 'components/account/Signup'
import Dashboard from 'components/Dashboard'
import Navbar from 'components/Navbar'
import TeamForm from 'components/team/TeamForm'
import TicketForm from 'components/ticket/TicketForm'
import TicketIndex from 'components/ticket/TicketIndex'
import TicketView from 'components/ticket/TicketView'
import Viewer from 'components/Viewer'
import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Card, Icon } from './components/elements'
import './style.css'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container mt-5">
          <h1 className="mb-3">
            <Icon icon="task" /> Support
          </h1>

          <Navbar />

          <Card>
            <Switch>
              <Route path="/tickets/new" component={TicketForm} />
              <Route path="/tickets/:id" component={TicketView} />
              <Route path="/tickets" component={TicketIndex} />
              <Route path="/account/signup" component={Signup} />
              <Route path="/account/login" component={Login} />
              <Route path="/account/profile" component={Profile} />
              <Route path="/viewer" component={Viewer} />
              <Route path="/teams/new" component={TeamForm} />
              <Route path="/" component={Dashboard} />
            </Switch>
          </Card>
        </div>
      </Router>
    )
  }
}

export default App
