import { Reservation } from 'interfaces'

/**
 * Transform the Wework representation of reservation to the representation used in this project.
 * This function inject the users data in the function used to actually parse the reservations.
 * @param users list of Wework users
 * @returns function parsing the Wework reservations.
 */
const parseReservation =
  (users: any[]) =>
  (reservation: any): Reservation => {
    const { attributes } = reservation
    if (!reservation.attributes)
      throw new Error(`Invalid reservation. Not 'attributes' field found`)

    const {
      user_uuid: userId,
      reservable_uuid: reservableId,
      start,
    } = attributes

    const foundUser = users.find((user) => user?.attributes?.uuid === userId)
    const user = {
      name: foundUser?.attributes?.name,
      email: foundUser?.attributes?.email,
    }

    return { user, reservableId, start }
  }

/**
 * Fetch the reservations of the company Goshaba which start after the current date.
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

  const firstUrl = `https://rooms.wework.com/api/v7/reservations?filter[company_uuid]=${companyUuid}&page[size]=100&page[number]=1&filter[finish_gte]=${currentDate}&sort=start&include=user`

  const handlePagination = async (url: string): Promise<Reservation[]> => {
    const response = await fetch(url, {
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
    })

    const { data, included, next } = await response.json()

    const users = included.filter((element: any) => element.type === 'users')

    const pageReservations = data.map(parseReservation(users))

    if (next) {
      const nextPageReservations = await handlePagination(next)
      return [...pageReservations, ...nextPageReservations]
    }

    return pageReservations
  }

  return handlePagination(firstUrl)
}
