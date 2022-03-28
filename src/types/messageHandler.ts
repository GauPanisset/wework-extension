import { GlobalState, Message } from 'interfaces'
import { ResponseHandler } from 'types'

export type MessageHandler = (
  message: Message,
  previousState: GlobalState,
  sendResponse: ResponseHandler
) => GlobalState
