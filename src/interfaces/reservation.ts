import { User } from 'interfaces'

export interface Reservation {
  reservableId: string
  start: string
  user: User
}
