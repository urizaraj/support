import { Request, Response, NextFunction } from 'express'
import Ticket, { TicketModel } from '../models/Ticket'
import Post from '../models/Post'

type Route = (req: Request, res: Response) => void

export const createPost: Route = async (req, res) => {
  const { ticketId, ...rest } = req.body
  const ticket = await Ticket.findById(ticketId)

  ticket.posts.push(rest)
  ticket.save()
  res.json(ticket.toJSON())
}
