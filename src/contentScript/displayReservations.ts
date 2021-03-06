import { Reservation } from 'interfaces'

import { getElement } from './getElement'

/**
 * Display the reservations of the given reservable.
 * It implements the design of the reservations list to add in the WeWork reservable card.
 * @param reservableUuid uuid of the reservable (desk, room, ...)
 * @param reservations list of reservations on the given reservable id.
 */
export const displayReservations = async (
  reservableUuid: string,
  reservations: Reservation[]
): Promise<void> => {
  const inventoryCard = await getElement(`[id='${reservableUuid}']`)
  if (inventoryCard) {
    const inventoryCardInfo = inventoryCard
      .getElementsByClassName('inventory-card__info')
      .item(0)
    if (inventoryCardInfo) {
      const id = `${reservableUuid}-reservations`
      let reservationInfo = document.getElementById(id)
      if (!reservationInfo) {
        reservationInfo = document.createElement('div')
        reservationInfo.id = `${reservableUuid}-reservations`
        reservationInfo.className = 'inventory-card__extra-info'
      }

      reservationInfo.innerHTML = `(${reservations.length}) ${reservations
        .map((reservation) => reservation.user.name)
        .join(', ')}`
      inventoryCardInfo.appendChild(reservationInfo)
    }
  } else {
    console.error(`Can't find any inventory card with id ${reservableUuid}`)
  }
}
