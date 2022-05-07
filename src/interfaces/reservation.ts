import { Location, Reservable, User } from 'interfaces'

interface ReservationDates {
  finish: string
  start: string
}

export interface Reservation {
  dates: ReservationDates
  location: Location
  reservable: Reservable
  user: User
}
