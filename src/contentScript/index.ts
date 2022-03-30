import { MessageType } from 'enums'

import { displayReservations } from './displayReservations'
import { getAccessToken } from './getAccessToken'
import { getElement } from './getElement'
import { getUserPreferences } from './getUserPreferences'
import { getReservations } from './getReservations'

const addCollaboratorReservations = async () => {
  const accessToken = getAccessToken()
  const { locale, companyUuid } = getUserPreferences()

  chrome.runtime.sendMessage({
    type: MessageType.NewLocale,
    payload: { locale },
  })

  const reservations = await getReservations(accessToken, companyUuid)

  console.log(reservations)

  chrome.runtime.sendMessage({
    type: MessageType.NewReservations,
    payload: { reservations },
  })

  const datePicker = await getElement('.DayPickerInput')
  const datePickerInput = datePicker?.querySelector('input')

  if (datePickerInput) {
    chrome.runtime.sendMessage({
      type: MessageType.NewDate,
      payload: { date: datePickerInput?.value },
    })

    /**
     * Create the observer which listen for DatePicker input change.
     */
    const observer = new MutationObserver((mutations: MutationRecord[]) => {
      /**
       * Keep the date to sent here to prevent the double message sent.
       */
      let dateToSend = null
      for (const mutation of mutations) {
        if (
          dateToSend !== datePickerInput.value &&
          mutation.type === 'attributes' &&
          mutation.attributeName === 'value'
        ) {
          dateToSend = datePickerInput.value
          chrome.runtime.sendMessage({
            type: MessageType.NewDate,
            payload: { date: datePickerInput.value },
          })
        }
      }
    })

    observer.observe(datePickerInput as Node, { attributes: true })
  }
}

addCollaboratorReservations()

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message)
  if (message.type === MessageType.RenderReservations) {
    const groupedReservations = message.payload.reservations
    for (const reservableId in message.payload.reservations) {
      displayReservations(reservableId, groupedReservations[reservableId])
    }
    sendResponse(true)
  }
})
