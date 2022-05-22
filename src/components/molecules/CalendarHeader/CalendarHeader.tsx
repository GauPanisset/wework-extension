import { DateTime } from 'luxon'
import styled from 'styled-components'

import Cell from 'components/atoms/Cell'
import CalendarHeaderCell from 'components/molecules/CalendarHeaderCell'
import ThemeModeToggle from 'components/molecules/ThemeModeToggle'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const SettingsCell = styled(Cell)`
  align-items: center;
  justify-content: center;

  &::after {
    display: none;
  }
`

const Row = styled.div`
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
 * It only displays the SettingsCell and a row of CalendarHeaderCell.
 */
const CalendarHeader = ({ columns }: CalendarHeaderProps): JSX.Element => {
  return (
    <Wrapper>
      <SettingsCell>
        <ThemeModeToggle />
      </SettingsCell>
      <Row>
        {columns.map((date) => (
          <CalendarHeaderCell
            key={`head-${date.toISODate({ format: 'basic' })}`}
            date={date}
          />
        ))}
      </Row>
    </Wrapper>
  )
}

export default CalendarHeader
