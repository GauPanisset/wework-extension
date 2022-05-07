import styled from 'styled-components'

import CalendarBody from 'components/molecules/CalendarBody'
import CalendarHeader from 'components/molecules/CalendarHeader'

import useCalendar from './useCalendar'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;

  padding: 8px;
`

/**
 * Render the Calendar.
 * It shows the reservations on different reservable/locations during a given period of days.
 */
const Calendar = () => {
  const { columns, groupedReservations } = useCalendar()

  return (
    <Wrapper>
      <CalendarHeader columns={columns} />
      <CalendarBody columns={columns} data={groupedReservations} />
    </Wrapper>
  )
}

export default Calendar
