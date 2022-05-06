import { DateTime } from 'luxon'
import styled from 'styled-components'

import CalendarHeaderCell from 'components/molecules/CalendarHeaderCell'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;

  background-color: ${({ theme }) => theme.palette.primary.main}0d;
  border-radius: 4px;
  border: 0.5px solid ${({ theme }) => theme.palette.primary.light};
`

interface CalendarHeaderProps {
  /**
   * List of DateTime defining the columns of the Calendar.
   */
  columns: DateTime[]
}

/**
 * Render the header part of the Calendar.
 * It only displays a row of CalendarHeaderCell.
 */
const CalendarHeader = ({ columns }: CalendarHeaderProps): JSX.Element => {
  return (
    <Wrapper>
      {columns.map((date) => (
        <CalendarHeaderCell
          key={`head-${date.toISODate({ format: 'basic' })}`}
          date={date}
        />
      ))}
    </Wrapper>
  )
}

export default CalendarHeader
