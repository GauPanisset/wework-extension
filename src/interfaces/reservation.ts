import { Location, Reservable, User } from 'interfaces'

export interface Reservation {
  finish: string
  location: Location
  reservable: Reservable
  start: string
  user: User
}
