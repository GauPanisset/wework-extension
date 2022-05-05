import { Reservation } from 'interfaces'

import { getUser } from './getUser'

/**
 * Transform the WeWork representation of reservation to the representation used in this project.
 * This function inject the users data in the function used to actually parse the reservations.
 * @param users list of WeWork users
 * @returns function parsing the WeWork reservations.
 */
const parseReservation =
  (accessToken: string, locations: any[]) =>
  async (reservation: any): Promise<Reservation> => {
    const { attributes } = reservation
    if (!reservation.attributes)
      throw new Error(`Invalid reservation. Not 'attributes' field found`)

    const {
      finish,
      location_uuid: locationUuid,
      reservable_uuid: reservableUuid,
      start,
      user_uuid: userUuid,
    } = attributes

    const foundLocation = locations.find(
      (location) => location?.attributes?.uuid === locationUuid
    )

    const user = await getUser(accessToken, userUuid)

    const location = {
      address: foundLocation?.attributes?.address,
      name: foundLocation?.attributes?.name,
    }

    return { finish, location, reservableUuid, start, user }
  }

/**
 * Fetch the reservations of a given company which start after the current date.
 * It also handle pagination if more than 100 reservations are booked.
 * @param accessToken JWT user access token
 * @param companyUuid Uuid of the user's company
 * @returns list of reservations.
 */
export const getReservations = async (
  accessToken: string,
  companyUuid: string
): Promise<Reservation[]> => {
  const currentDate = new Date().toISOString()

  const firstUrl = `https://rooms.wework.com/api/v7/reservations?filter[company_uuid]=${companyUuid}&page[size]=100&page[number]=1&filter[finish_gte]=${currentDate}&sort=start&include=location`

  const handlePagination = async (url: string): Promise<Reservation[]> => {
    const response = await fetch(url, {
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
    })

    const { data, included, next } = await response.json()

    const locations = included.filter(
      (element: any) => element.type === 'locations'
    )

    const pageReservationsPromises = data.map(
      parseReservation(accessToken, locations)
    )
    const pageReservations = await Promise.all(pageReservationsPromises)

    if (next) {
      const nextPageReservations = await handlePagination(next)
      return [...pageReservations, ...nextPageReservations]
    }

    return pageReservations
  }

  return handlePagination(firstUrl)
}
