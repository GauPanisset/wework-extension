import { DateTime } from 'luxon'
import styled from 'styled-components'
import { Typography } from '@mui/material'

import Cell from 'components/atoms/Cell'

const Wrapper = styled(Cell)`
  flex-direction: column;
  align-items: center;

  color: ${({ theme }) => theme.palette.primary.main};
`

interface CalendarHeaderCellProps {
  /**
   * Date to display.
   */
  date: DateTime
}

/**
 * Implement the style and the content of a Cell placed in the Calendar header.
 * It displays the day and the day week.
 */
const CalendarHeaderCell = ({ date }: CalendarHeaderCellProps): JSX.Element => {
  return (
    <Wrapper>
      <Typography variant="h4">{date.day}</Typography>
      <Typography variant="body1">{date.weekdayLong.toLowerCase()}</Typography>
    </Wrapper>
  )
}

export default CalendarHeaderCell
