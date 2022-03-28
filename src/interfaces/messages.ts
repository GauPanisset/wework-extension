import { MessageType } from 'enums'
import { Reservation } from 'interfaces'

export type Message =
  | NewDateMessage
  | NewLocaleMessage
  | NewReservationsMessage
  | RenderReservationsMessage

export interface NewDateMessage {
  type: MessageType.NewDate
  payload: { date: string }
}

export interface NewLocaleMessage {
  type: MessageType.NewLocale
  payload: { locale: string }
}

export interface NewReservationsMessage {
  type: MessageType.NewReservations
  payload: { reservations: Reservation[] }
}

export interface RenderReservationsMessage {
  type: MessageType.RenderReservations
  payload: { reservations: Reservation[] }
}
