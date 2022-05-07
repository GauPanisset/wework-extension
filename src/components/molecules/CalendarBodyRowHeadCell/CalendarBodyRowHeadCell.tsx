import styled from 'styled-components'
import { Typography } from '@mui/material'

import Cell from 'components/atoms/Cell'
import { Location } from 'interfaces'

const Wrapper = styled(Cell)`
  align-items: center;

  width: 120px;

  color: ${({ theme }) => theme.palette.primary.main};

  & p {
    width: 100%;
  }
`

interface CalendarBodyRowHeadCellProps {
  /**
   * Location attached to the reservable linked to the row.
   */
  location: Location
}

/**
 * Implement the style and the content of the head Cell of a row in the Calendar body.
 */
const CalendarBodyRowHeadCell = ({
  location,
}: CalendarBodyRowHeadCellProps) => {
  return (
    <Wrapper>
      <Typography variant="body1" align="center">
        {location.name}
      </Typography>
    </Wrapper>
  )
}

export default CalendarBodyRowHeadCell
