import { RequestHandler } from 'express'
import Ticket from '../models/Ticket'

type Route = RequestHandler

export const getTickets: Route = async (req, res) => {
  const tickets = await Ticket.find({}).populate('team')

  res.json(tickets.map(ticket => ticket.toJSON()))
}

export const getTicket: Route = async (req, res) => {
  const ticket = await Ticket.findById(req.params.id)
    .populate('team')
    .populate('user')
    .populate('posts.user')
  res.json(ticket.toJSON())
}

export const postTicket: Route = (req, res) => {
  const ticket = new Ticket({
    ...req.body
  })

  ticket.save()

  res.json(ticket.toJSON())
}

export const deleteTicket: Route = async (req, res) => {
  await Ticket.findByIdAndRemove(req.params.id)
  res.sendStatus(204)
}

export const patchTicket: Route = async (req, res) => {
  const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  })
    .populate('team')
    .populate('user')
    .populate('posts.user')

  res.json(ticket.toJSON())
}

export const getTicketsUnassigned: Route = async (req, res) => {
  const tickets = await Ticket.find({})
    .where({ assignedTo: { $exists: false } })
    .populate('team')

  res.json(tickets.map(ticket => ticket.toJSON()))
}
