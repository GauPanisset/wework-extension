import { ReservableType } from 'enums'

export interface Reservable {
  name?: string
  type: ReservableType
  uuid: string
}
