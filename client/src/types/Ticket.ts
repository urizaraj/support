import { Post } from 'types/Post'
import { User } from 'types/User'

export interface Ticket {
  title: string
  category: string
  status: 'open' | 'closed' | 'onHold'
  priority: number
  posts: Post[]
  id: number
  content?: string
  user: User
}
