import { NewReservationsMessage } from 'interfaces'
import { MessageHandler } from 'types'

export const handleNewReservations: MessageHandler = (
  message,
  previousState,
  sendResponse
) => {
  const { payload } = message as NewReservationsMessage

  sendResponse(true)

  return { ...previousState, reservations: payload.reservations }
}
