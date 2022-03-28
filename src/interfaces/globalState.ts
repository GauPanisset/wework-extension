import { Locale } from 'enums'
import { Reservation } from 'interfaces'

export interface GlobalState {
  locale: Locale
  reservations: Reservation[]
}
