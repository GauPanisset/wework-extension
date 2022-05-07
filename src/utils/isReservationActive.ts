import { DateTime } from 'luxon'

import { Reservation } from 'interfaces'

/**
 * Return the dates required to check if a reservation is active.
 * @param reservation reservation to check
 * @param _date optionally the date to check
 */
const transformParams = (reservation: Reservation, _date?: DateTime) => {
  const { dates, location } = reservation
  const { finish, start } = dates
  const { timeZone } = location

  const date = (_date || DateTime.local()).setZone(timeZone)

  const startDay = date.startOf('day')
  const endDay = date.endOf('day')

  const startDate = DateTime.fromISO(start).setZone(timeZone)
  const finishDate = DateTime.fromISO(finish).setZone(timeZone)

  return { startDay, endDay, startDate, finishDate }
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
  const { startDay, endDay, startDate } = transformParams(reservation, date)

  return startDay <= startDate && startDate <= endDay
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
  const { endDay, startDate } = transformParams(reservation, date)

  return startDate <= endDay
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
  const { startDay, finishDate } = transformParams(reservation, date)

  return startDay <= finishDate
}
