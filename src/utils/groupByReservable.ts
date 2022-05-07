import { Reservation } from 'interfaces'
import { ReservationMap } from 'types'

/**
 * Group the reservations according to their reservable uuid.
 * @param reservations list of reservations
 * @returns Map of the reservations grouped by reservable uuid.
 */
export const groupByReservable = (
  reservations: Reservation[]
): ReservationMap => {
  const groupedReservations: ReservationMap = {}

  for (const reservation of reservations) {
    const { reservable } = reservation
    if (groupedReservations[reservable.uuid])
      groupedReservations[reservable.uuid].push(reservation)
    else groupedReservations[reservable.uuid] = [reservation]
  }

  return groupedReservations
}
