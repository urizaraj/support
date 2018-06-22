import { Ticket } from 'types/Ticket'
import { User } from 'types/User'

export interface Post {
  content: string
  category: 'post' | 'resolution'
  ticket: Ticket
  id: string
  user: User
}
