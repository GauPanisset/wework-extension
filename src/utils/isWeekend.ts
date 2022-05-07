import { DateTime } from 'luxon'

export const isWeekend = (date: DateTime) => date.weekday >= 6
