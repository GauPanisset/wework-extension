import { Reservation } from 'interfaces'

/**
 * Group the reservations according to their reservableUuid.
 * @param reservations list of reservations
 * @returns Map of the reservations grouped by reservableUuid.
 */
export const groupByReservable = (
  reservations: Reservation[]
): Record<string, Reservation[]> => {
  const groupedReservations = {} as Record<string, Reservation[]>

  for (const reservation of reservations) {
    const { reservableUuid } = reservation
    if (groupedReservations[reservableUuid])
      groupedReservations[reservableUuid].push(reservation)
    else groupedReservations[reservableUuid] = [reservation]
  }

  return groupedReservations
}
