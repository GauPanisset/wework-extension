import { Locale, MessageType } from 'enums'
import { GlobalState, Message } from 'interfaces'
import { MessageHandler, ResponseHandler } from 'types'

import { handleNewDate } from './handleNewDate'
import { handleNewLocale } from './handleNewLocale'
import { handleNewReservations } from './handleNewReservations'
import { initializeIconManager } from './initializeIconManager'

let state: GlobalState = {
  locale: Locale.FrFR,
  reservations: [],
}

/**
 * Retrieve the global state from chrome local storage when the worker starts.
 */
const retrieveState = async (): Promise<void> => {
  const localStorage = await chrome.storage.local.get([
    'locale',
    'reservations',
  ])

  console.log('Chrome Local Storage', localStorage)
  Object.assign(state, localStorage)
}

const messageHandlers: Record<string, MessageHandler> = {
  [MessageType.NewDate]: handleNewDate,
  [MessageType.NewLocale]: handleNewLocale,
  [MessageType.NewReservations]: handleNewReservations,
}

const messageListener = (
  message: Message,
  _sender: chrome.runtime.MessageSender,
  sendResponse: ResponseHandler
) => {
  console.log('Message', message)

  if (Object.values(MessageType).includes(message.type)) {
    state = messageHandlers[message.type](message, state, sendResponse)
    /**
     * Chrome Locale Storage is used to shared the global state with the popup.
     */
    chrome.storage.local.set(state)
  }
}

retrieveState()
initializeIconManager()

chrome.runtime.onMessage.addListener(messageListener)
