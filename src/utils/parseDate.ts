import { DateTime } from 'luxon'

import { Locale } from 'enums'

const formatByLocale: Record<Locale, string> = {
  [Locale.CsCZ]: 'ccc d L', //čt 24. 3.
  [Locale.DeDE]: 'ccc, d LLL', //Do., 24. März
  [Locale.EnUS]: 'ccc, LLL d', //Thu, Mar 24
  [Locale.EsES]: 'ccc d LLL', //jue, 24 mar
  [Locale.EsLA]: 'ccc d LLL', //jue, 24 mar
  [Locale.FrCA]: 'ccc d LLL', //jeu. 24 mars
  [Locale.FrFR]: 'ccc d LLL', //jeu. 24 mars
  [Locale.IdID]: 'ccc, d LLL', //Kam, 24 Mar
  [Locale.ItIT]: 'ccc d LLL', //gio 24 mar
  [Locale.NlNL]: 'ccc d LLL', //do 24 mrt.
  [Locale.PlPL]: 'ccc, d LLL', //czw., 24 mar
  [Locale.PtBR]: 'ccc, d LLL', //qui., 24 de mar.
  [Locale.RuRU]: 'ccc, d LLL', //чт, 24 мар.
  [Locale.JaJP]: 'L d ccc', //3月24日(木)
  [Locale.KoKR]: 'L d ccc', //3월 24일 (목)
  [Locale.ThTH]: 'ccc d LLL', //พฤ. 24 มี.ค.
  [Locale.ViVN]: 'ccc, d LLL', //Th 5, 24 thg 3
  [Locale.ZhCN]: 'L d ccc', //3月24日周四
  [Locale.ZhTW]: 'L d ccc', //3月24日 週四
}

/**
 * Parse a date which is in a human-readable format and transform it into the ISO format in the UTC zone.
 * @param date date in a human-readable format
 * @param locale locale used to translate the date
 * @returns date in the ISO format (UTC)
 */
export const parseDate = (date: string, locale: Locale) => {
  let dateTime = DateTime.fromFormat(date, formatByLocale[locale], {
    locale,
    zone: 'utc',
  })

  /**
   * If the date can't be parsed, it's assumed to be the current day.
   */
  if (!dateTime.isValid) dateTime = DateTime.utc().startOf('day')

  return dateTime
}
