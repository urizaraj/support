import mongoose from 'mongoose'
import { TeamModel } from './Team'
import { postSchema, PostModel } from './Post'

export type TicketModel = mongoose.Document & {
  title: string
  category: string
  status: 'open' | 'onHold' | 'closed'
  priority: number
  content: string
  team: TeamModel
  posts: PostModel[]
}

const ObjectId = mongoose.SchemaTypes.ObjectId

const ticketSchema = new mongoose.Schema(
  {
    title: String,
    category: String,
    status: { type: String, default: 'open' },
    priority: Number,
    content: String,
    team: { type: ObjectId, ref: 'Team' },
    posts: [postSchema]
  },
  {
    toJSON: { getters: true },
    usePushEach: true
  }
)

const Ticket = mongoose.model<TicketModel>('Ticket', ticketSchema)
export default Ticket
