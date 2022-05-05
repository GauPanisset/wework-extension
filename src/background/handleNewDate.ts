import { MessageType } from 'enums'
import { NewDateMessage } from 'interfaces'
import { MessageHandler } from 'types'
import { groupByReservable, isReservationActive, parseDate } from 'utils'

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
    reservations.filter((reservation) => isReservationActive(reservation, date))
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
