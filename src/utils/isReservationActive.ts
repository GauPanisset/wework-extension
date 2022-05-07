import { DateTime } from 'luxon'

import { Reservation } from 'interfaces'

/**
 * Return the dates required to check if a reservation is active.
 *  * A reservation is active when the date to check at midday (12:00) is between its start date and its finish date.
 * @param reservation reservation to check
 * @param _date optionally the date to check
 */
const transformParams = (reservation: Reservation, _date?: DateTime) => {
  const date = _date || DateTime.utc()
  const midDate = date.startOf('day').plus({ hours: 12 })

  /**
   * Reservation dates are in UTC.
   */
  const startDate = DateTime.fromISO(reservation.start)
  const finishDate = DateTime.fromISO(reservation.finish)

  return { finishDate, midDate, startDate }
}

/**
 * Check if a given reservation is active at a given date or at the current day.
 * @param reservation reservation to check
 * @param date optionally the date to check
 */
export const isReservationActive = (
  reservation: Reservation,
  date?: DateTime
): boolean => {
  const { finishDate, midDate, startDate } = transformParams(reservation, date)

  return startDate <= midDate && midDate <= finishDate
}

/**
 * Check if a given reservation is active before a given date or the current day.
 * @param reservation reservation to check
 * @param date optionally the date to check
 */
export const isReservationActiveBefore = (
  reservation: Reservation,
  date?: DateTime
) => {
  const { midDate, startDate } = transformParams(reservation, date)

  return startDate <= midDate
}

/**
 * Check if a given reservation is active after a given date or the current day.
 * @param reservation reservation to check
 * @param date optionally the date to check
 */
export const isReservationActiveAfter = (
  reservation: Reservation,
  date?: DateTime
) => {
  const { finishDate, midDate } = transformParams(reservation, date)

  return midDate <= finishDate
}
