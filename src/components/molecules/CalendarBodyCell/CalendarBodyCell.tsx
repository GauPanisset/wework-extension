import styled from 'styled-components'

import Cell from 'components/atoms/Cell'

const Wrapper = styled(Cell)`
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 8px;
`

interface CalendarBodyCellProps {
  children: React.ReactNode
}

/**
 * Implement the style of a Cell placed in the Calendar body.
 */
const CalendarBodyCell = ({ children }: CalendarBodyCellProps): JSX.Element => {
  return <Wrapper>{children}</Wrapper>
}

export default CalendarBodyCell
