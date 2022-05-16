import uniqBy from 'lodash/uniqBy'
import { DateTime } from 'luxon'
import styled from 'styled-components'

import CalendarBodyCell from 'components/molecules/CalendarBodyCell'
import CalendarBodyRowHeadCell from 'components/molecules/CalendarBodyRowHeadCell'
import HoverMoreAvatar from 'components/molecules/HoverAvatar/variants/HoverMoreAvatar'
import HoverUserAvatar from 'components/molecules/HoverAvatar/variants/HoverUserAvatar'
import { ReservableType } from 'enums'
import { Reservation } from 'interfaces'
import { isReservationActive } from 'utils'

const MAX_AVATAR_BY_CELL = 6

const Wrapper = styled.div`
  display: flex;

  background-color: ${({ theme }) => theme.palette.primary.main}0d;
  border-radius: 4px;
  border: 0.5px solid ${({ theme }) => theme.palette.primary.light}40;
`

interface CalendarBodyRowProps {
  /**
   * List of DateTime defining the columns of the Calendar.
   */
  columns: DateTime[]
  /**
   * List of Reservations to display in the row.
   */
  reservations: Reservation[]
}

/**
 * Sort the reservations to have those of type Conference Room first.
 */
const sortByReservableType = (
  reservationA: Reservation,
  reservationB: Reservation
) => {
  if (reservationA.reservable.type === ReservableType.ConferenceRoom) return -1
  if (reservationB.reservable.type === ReservableType.ConferenceRoom) return 1
  return 0
}

/**
 * Render a row of the Calendar body. The row display all the reservations in the period for a given reservable.
 * A row contains a head Cell and some body Cell. Each body Cell wraps Reservations represented as user Avatar.
 */
const CalendarBodyRow = ({ columns, reservations }: CalendarBodyRowProps) => {
  return (
    <Wrapper>
      <CalendarBodyRowHeadCell location={reservations[0].location} />
      {columns.map((date) => {
        /**
         * Note that `_.uniqBy` keep the first occurrence. Thus by sorting by reservable type first,
         * it is guaranteed to remove the `DailyDesk` duplicate and not the `ConferenceRoom` containing more information.
         */
        const reservationsAtDate = uniqBy(
          reservations
            .filter((reservation) => isReservationActive(reservation, date))
            .sort(sortByReservableType),
          'user.uuid'
        )

        const shouldDisplayMoreAvatar =
          reservationsAtDate.length > MAX_AVATAR_BY_CELL
        const indexOfLastDisplayedUser =
          MAX_AVATAR_BY_CELL - (shouldDisplayMoreAvatar ? 1 : 0)

        return (
          <CalendarBodyCell key={`body-${date.toISODate({ format: 'basic' })}`}>
            {reservationsAtDate
              .slice(0, indexOfLastDisplayedUser)
              .map((reservation) => (
                <HoverUserAvatar
                  key={reservation.user.uuid}
                  reservation={reservation}
                />
              ))}
            {shouldDisplayMoreAvatar && (
              <HoverMoreAvatar
                users={reservationsAtDate
                  .slice(indexOfLastDisplayedUser)
                  .map((reservation) => reservation.user)}
              />
            )}
          </CalendarBodyCell>
        )
      })}
    </Wrapper>
  )
}

export default CalendarBodyRow
