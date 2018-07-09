import { Post } from 'types/Post'
import { Team } from 'types/Team'
import { User } from 'types/User'

export interface Ticket {
  id: string
  title: string
  category: string
  status: 'open' | 'closed' | 'onHold'
  priority: number
  posts: Post[]
  content?: string
  user: User
  team: Team
  assignedTo: User
}
