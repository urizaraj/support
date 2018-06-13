import { Ticket } from 'types/Ticket'
import { User } from 'types/User'

export interface Team {
  name: string
  members: User[]
  tickets: Ticket[]
  id: number
}
