import { Request, Response, NextFunction } from 'express'
import Ticket, { TicketModel } from '../models/Ticket'
import Post from '../models/Post'

type Route = (req: Request, res: Response) => void

export const createPost: Route = async (req, res) => {
  const { ticket, ...rest } = req.body
  const t = await Ticket.findById(ticket)

  t.posts.push(rest)
  t.save()
}
