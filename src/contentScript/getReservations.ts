import { ReservableType } from 'enums'
import { Reservation } from 'interfaces'

import { getUser } from './getUser'

/**
 * Map the reservable.type of WeWork with the ReservableType enum.
 */
const reservableType: Record<string, ReservableType> = {
  conference_rooms: ReservableType.ConferenceRoom,
  daily_desks: ReservableType.DailyDesk,
}

/**
 * Transform the WeWork representation of reservation to the representation used in this project.
 * This function inject the users data in the function used to actually parse the reservations.
 * @param accessToken JWT access token
 * @param locations list of WeWork locations
 * @param reservables list of WeWork reservables
 * @returns function parsing the WeWork reservations.
 */
const parseReservation =
  (accessToken: string, locations: any[], reservables: any[]) =>
  async (reservation: any): Promise<Reservation> => {
    const { attributes } = reservation
    if (!reservation.attributes)
      throw new Error(`Invalid reservation. No 'attributes' field found`)

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

    const foundReservable = reservables.find(
      (reservable) => reservable.attributes?.uuid === reservableUuid
    )

    const location = {
      address: foundLocation?.attributes?.address,
      name: foundLocation?.attributes?.name,
      uuid: locationUuid,
    }

    const reservable = {
      name: foundReservable?.attributes?.name,
      type: reservableType[foundReservable?.type],
      uuid: reservableUuid,
    }

    const user = await getUser(accessToken, userUuid)

    return { finish, location, reservable, start, user }
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

  const firstUrl = `https://rooms.wework.com/api/v7/reservations?filter[company_uuid]=${companyUuid}&page[size]=100&page[number]=1&filter[finish_gte]=${currentDate}&sort=start&include=location,reservable`

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
    const reservables = included.filter((element: any) =>
      Object.keys(reservableType).includes(element.type)
    )

    const pageReservationsPromises = data.map(
      parseReservation(accessToken, locations, reservables)
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
