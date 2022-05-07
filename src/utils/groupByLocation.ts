import { Reservation } from 'interfaces'
import { ReservationMap } from 'types'

/**
 * Group the reservations according to their location.
 * @param reservations list of reservations
 * @returns Map of the reservations grouped by location uuid.
 */
export const groupByLocation = (
  reservations: Reservation[]
): ReservationMap => {
  const groupedReservations: ReservationMap = {}

  for (const reservation of reservations) {
    const { location } = reservation
    if (groupedReservations[location.uuid])
      groupedReservations[location.uuid].push(reservation)
    else groupedReservations[location.uuid] = [reservation]
  }

  return groupedReservations
}
