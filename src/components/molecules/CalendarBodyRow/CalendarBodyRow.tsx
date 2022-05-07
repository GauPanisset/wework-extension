import { DateTime } from 'luxon'
import styled from 'styled-components'

import CalendarBodyCell from 'components/molecules/CalendarBodyCell'
import CalendarBodyRowHeadCell from 'components/molecules/CalendarBodyRowHeadCell'
import HoverAvatar from 'components/molecules/HoverAvatar'
import { Reservation } from 'interfaces'
import { isReservationActive } from 'utils'

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
 * Render a row of the Calendar body. The row display all the reservations in the period for a given reservable.
 * A row contains a head Cell and some body Cell. Each body Cell wraps Reservations represented as user Avatar.
 */
const CalendarBodyRow = ({ columns, reservations }: CalendarBodyRowProps) => {
  return (
    <Wrapper>
      <CalendarBodyRowHeadCell location={reservations[0].location} />
      {columns.map((date) => (
        <CalendarBodyCell key={`body-${date.toISODate({ format: 'basic' })}`}>
          {reservations
            .filter((reservation) => isReservationActive(reservation, date))
            .map((reservation) => (
              <HoverAvatar
                key={reservation.user.uuid}
                reservable={reservation.reservable}
                user={reservation.user}
              />
            ))}
        </CalendarBodyCell>
      ))}
    </Wrapper>
  )
}

export default CalendarBodyRow
