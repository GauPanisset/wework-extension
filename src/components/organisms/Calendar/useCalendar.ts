import React from 'react'
import { DateTime } from 'luxon'

import { Reservation } from 'interfaces'
import { ReservationMap, StorageChanges } from 'types'
import {
  groupByLocation,
  isReservationActiveAfter,
  isReservationActiveBefore,
  isWeekend,
} from 'utils'

/**
 * Number of columns to display in the Calendar.
 */
const NUMBER_OF_COLUMNS = 5

/**
 * Filter the reservations that are not between the first and last date then group them by location.
 * @param reservations list of reservations
 * @param firstDate first date of the period to filter
 * @param lastDate last date of the period to filter
 */
const filterAndGroup = (
  reservations: Reservation[],
  firstDate: DateTime,
  lastDate: DateTime
): ReservationMap => {
  const filteredReservations = reservations.filter(
    (reservation) =>
      isReservationActiveAfter(reservation, firstDate) &&
      isReservationActiveBefore(reservation, lastDate)
  )

  const groupedReservations = groupByLocation(filteredReservations)

  return groupedReservations
}

/**
 * Create a list of DateTime which are all business days.
 * @param firstDate reference date to build the list
 * @param length final length of the list
 */
const createColumns = (firstDate: DateTime, length: number): DateTime[] => {
  const newColumns: DateTime[] = []

  let offset = 0
  while (newColumns.length < length) {
    const newDate = firstDate.plus({ days: offset })
    if (!isWeekend(newDate)) newColumns.push(newDate)
    offset++
  }

  return newColumns
}

/**
 * Custom hook attached to the Calendar component.
 */
const useCalendar = () => {
  /**
   * Reservations list.
   */
  const [reservations, setReservations] = React.useState<Reservation[]>([])

  /**
   * Perform two operations:
   * - Fetch the reservations from chrome local storage on mount.
   * - Add a listener on chrome local storage change event to keep the reservations list up to date.
   *
   * In 'local' environnement, you can import you mock data and inject them in this useEffect instead
   * of getting them from the chrome local storage.
   */
  React.useEffect(() => {
    if (chrome?.storage) {
      const getReservationsFromStorage = async (): Promise<void> => {
        const { reservations } = await chrome.storage.local.get([
          'reservations',
        ])
        setReservations(reservations)
      }

      getReservationsFromStorage()

      const storageListener = (changes: StorageChanges): void => {
        if (changes?.reservations) {
          const newReservations: Reservation[] = changes?.reservations.newValue

          setReservations(newReservations)
        }
      }

      chrome.storage.onChanged.addListener(storageListener)
      return () => chrome.storage.onChanged.removeListener(storageListener)
    } else {
      /**
       * * Add some mock data HERE in local environment.
       */
      setReservations([])
    }
  }, [])

  /**
   * First date to display in the Calendar.
   */
  const firstDate = DateTime.local()

  /**
   * Calendar columns. It defines the period displayed in the Calendar.
   */
  const columns = createColumns(firstDate, NUMBER_OF_COLUMNS)

  const groupedReservations = filterAndGroup(
    reservations,
    firstDate,
    firstDate.plus({ days: NUMBER_OF_COLUMNS - 1 })
  )

  return { columns, firstDate, groupedReservations }
}

export default useCalendar
