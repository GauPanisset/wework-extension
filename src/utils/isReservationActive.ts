import { DateTime } from 'luxon'

import { Reservation } from 'interfaces'

/**
 * Check if a given reservation is active at a given date or at the current day.
 * A reservation is active when the date to check at midday (12:00) is between its start date and its finish date.
 * @param reservation reservation to check
 * @param _date optionally the date to check
 */
export const isReservationActive = (
  reservation: Reservation,
  _date?: DateTime
): boolean => {
  const date = _date || DateTime.utc()
  const midDate = date.startOf('day').plus({ hours: 12 })

  /**
   * Reservation dates are in UTC.
   */
  const startDate = DateTime.fromISO(reservation.start)
  const finishDate = DateTime.fromISO(reservation.finish)

  return startDate <= midDate && midDate <= finishDate
}
