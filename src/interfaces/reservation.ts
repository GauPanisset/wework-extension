import { Location, User } from 'interfaces'

export interface Reservation {
  finish: string
  location: Location
  reservableUuid: string
  start: string
  user: User
}
