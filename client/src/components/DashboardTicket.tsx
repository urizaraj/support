import { BCol, Btn, Row } from 'components/elements'
import React, { Component } from 'react'
import { Collapse } from 'react-collapse'
import { Ticket } from 'types'

type DTP = Ticket

const intialState = {
  clicked: false
}

type DTS = Readonly<typeof intialState>

class DashboardTicket extends Component<DTP, DTS> {
  state = intialState

  handleClick = () => this.setState(p => ({ clicked: !p.clicked }))

  render() {
    const ticket = this.props
    return (
      <>
        <Row opt="align-items-center">
          <BCol>{ticket.title}</BCol>
          <BCol>{ticket.team.name} </BCol>
          <BCol>
            <Btn onClick={this.handleClick} primary>
              Assign
            </Btn>
          </BCol>
        </Row>
        <Collapse isOpened={this.state.clicked}>
          <h2 className="mb-0">Select a User</h2>
        </Collapse>
      </>
    )
  }
}

export default DashboardTicket
