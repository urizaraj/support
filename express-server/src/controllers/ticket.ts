import { Request, Response, NextFunction, RequestHandler } from 'express'
import Ticket, { TicketModel } from '../models/Ticket'

type Route = RequestHandler

export const getTickets: Route = async (req, res) => {
  const tickets = await Ticket.find({}).populate('team')

  res.json(tickets.map(ticket => ticket.toJSON()))
}

export const getTicket: Route = async (req, res) => {
  const ticket = await Ticket.findById(req.params.id).populate('team')
  res.json(ticket.toJSON())
}

export const postTicket: Route = (req, res) => {
  const ticket = new Ticket({
    ...req.body
  })

  ticket.save()

  res.json(ticket.toJSON())
}
