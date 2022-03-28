import { Locale } from 'enums'
import { NewLocaleMessage } from 'interfaces'
import { MessageHandler } from 'types'

export const handleNewLocale: MessageHandler = (
  message,
  previousState,
  sendResponse
) => {
  const { locale } = previousState
  const { payload } = message as NewLocaleMessage

  const receivedLocale = payload.locale as Locale
  let newLocale = locale
  if (Object.values(Locale).includes(receivedLocale)) {
    newLocale = receivedLocale
  }

  sendResponse(true)

  return { ...previousState, locale: newLocale }
}
