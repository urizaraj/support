import { Ticket } from 'types/Ticket'

export interface Post {
  content: string
  category: 'post' | 'resolution'
  ticket: Ticket
  id: number
}
