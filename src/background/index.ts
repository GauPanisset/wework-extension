import { Locale, MessageType } from 'enums'
import { GlobalState, Message } from 'interfaces'
import { MessageHandler, ResponseHandler } from 'types'

import { handleNewDate } from './handleNewDate'
import { handleNewLocale } from './handleNewLocale'
import { handleNewReservations } from './handleNewReservations'

let state: GlobalState = {
  locale: Locale.FrFR,
  reservations: [],
}

const messageHandlers: Record<string, MessageHandler> = {
  [MessageType.NewDate]: handleNewDate,
  [MessageType.NewLocale]: handleNewLocale,
  [MessageType.NewReservations]: handleNewReservations,
}

const messageListener = (
  message: Message,
  sender: chrome.runtime.MessageSender,
  sendResponse: ResponseHandler
) => {
  console.log('Message', message)

  if (Object.values(MessageType).includes(message.type)) {
    state = messageHandlers[message.type](message, state, sendResponse)
  }
}

chrome.runtime.onMessage.addListener(messageListener)
