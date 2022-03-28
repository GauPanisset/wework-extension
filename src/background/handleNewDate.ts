import { DateTime } from 'luxon'

import { MessageType } from 'enums'
import { NewDateMessage } from 'interfaces'
import { MessageHandler } from 'types'
import { parseDate, groupByReservable } from 'utils'

export const handleNewDate: MessageHandler = (
  message,
  previousState,
  sendResponse
) => {
  const { locale, reservations } = previousState

  const { payload } = message as NewDateMessage

  const date = parseDate(payload.date, locale)
  sendResponse(true)

  const groupedReservations = groupByReservable(
    reservations.filter((reservation) => {
      const reservationDate = DateTime.fromISO(reservation.start, {
        zone: 'utc',
      })
      const diffWithSelectedDate = reservationDate
        .diff(date, 'days')
        .toObject().days

      return (
        diffWithSelectedDate !== undefined &&
        0 <= diffWithSelectedDate &&
        diffWithSelectedDate < 1
      )
    })
  )

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0].id as number
    chrome.tabs.sendMessage(tabId, {
      type: MessageType.RenderReservations,
      payload: {
        reservations: groupedReservations,
      },
    })
  })

  return { ...previousState }
}
