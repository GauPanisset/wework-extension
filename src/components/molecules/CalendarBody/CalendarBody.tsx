import { DateTime } from 'luxon'
import styled from 'styled-components'

import CalendarBodyRow from 'components/molecules/CalendarBodyRow'
import SleepingPanda from 'components/molecules/SleepingPanda'
import { Reservation } from 'interfaces'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  width: 100%;
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
  if (Object.keys(data).length === 0)
    return (
      <Wrapper>
        <SleepingPanda />
      </Wrapper>
    )

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
