import { DateTime } from 'luxon'
import styled from 'styled-components'

import CalendarBodyRow from 'components/molecules/CalendarBodyRow'
import { Reservation } from 'interfaces'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

interface CalendarBodyProps {
  /**
   * List of DateTime defining the columns of the Calendar.
   */
  columns: DateTime[]
  /**
   * Data to display in the Calendar.
   * It should be an object with a reservableUuid as a key and the attached Reservations as value.
   */
  data: Record<string, Reservation[]>
}

/**
 * Render the body of the Calendar organisms.
 */
const CalendarBody = ({ columns, data }: CalendarBodyProps) => {
  return (
    <Wrapper>
      {Object.entries(data).map(([reservableUuid, reservations]) => (
        <CalendarBodyRow
          key={reservableUuid}
          columns={columns}
          reservations={reservations}
        />
      ))}
    </Wrapper>
  )
}

export default CalendarBody
