import styled from 'styled-components'

import CalendarBody from 'components/molecules/CalendarBody'
import CalendarFooter from 'components/molecules/CalendarFooter'
import CalendarHeader from 'components/molecules/CalendarHeader'

import useCalendar from './useCalendar'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;

  height: 100%;
`

const ScrollableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  /**
   * We want to have no 'padding-bottom' when there are more calendar rows to show, that is why the Layout component has 'padding-bottom: 0'.
   * But we want this 'padding-bottom' when the scroll is at its end, that is why the 'padding-bottom' has been added here.
   */
  padding-bottom: 8px;

  width: 100%;

  overflow: scroll;
`

/**
 * Render the Calendar.
 * It shows the reservations on different reservable/locations during a given period of days.
 */
const Calendar = () => {
  const { columns, firstDate, groupedReservations } = useCalendar()

  return (
    <Wrapper>
      <CalendarHeader columns={columns} />
      <ScrollableContainer>
        <CalendarBody columns={columns} data={groupedReservations} />
        <CalendarFooter lastUpdate={firstDate} />
      </ScrollableContainer>
    </Wrapper>
  )
}

export default Calendar
