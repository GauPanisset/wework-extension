import React from 'react'
import { DateTime } from 'luxon'

import { Reservation } from 'interfaces'
import { groupByReservable } from 'utils'

/**
 * Number of columns to display in the Calendar.
 */
const NUMBER_OF_COLUMNS = 7

/**
 * Custom hook attached to the Calendar component.
 */
const useCalendar = () => {
  /**
   * Map of Reservations grouped by their reservable uuid.
   */
  const [groupedReservations, setGroupedReservations] = React.useState<
    Record<string, Reservation[]>
  >({})

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
        console.log('reservations', groupByReservable(reservations))
        setGroupedReservations(groupByReservable(reservations))
      }

      getReservationsFromStorage()

      const storageListener = (changes: {
        [key: string]: chrome.storage.StorageChange
      }): void => {
        if (changes?.reservations) {
          const newReservations: Reservation[] = changes?.reservations.newValue

          console.log('reservations', groupByReservable(newReservations))
          setGroupedReservations(groupByReservable(newReservations))
        }
      }

      chrome.storage.onChanged.addListener(storageListener)
      return () => chrome.storage.onChanged.removeListener(storageListener)
    } else {
      /**
       * * Add some mock data HERE in local environment.
       */
      setGroupedReservations(groupByReservable([]))
    }
  }, [])

  /**
   * First date to display in the Calendar.
   */
  const firstDate = DateTime.utc()

  /**
   * Calendar columns. It defines the period displayed in the Calendar.
   */
  const columns = new Array(NUMBER_OF_COLUMNS)
    .fill(0)
    .map((_, index) => firstDate.plus({ days: index + 1 }))

  return { columns, groupedReservations }
}

export default useCalendar
