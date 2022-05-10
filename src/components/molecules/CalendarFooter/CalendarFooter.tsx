import Typography from '@mui/material/Typography'
import { DateTime } from 'luxon'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;

  text-align: center;

  color: ${({ theme }) => theme.palette.primary.dark};
`

interface CalendarFooterProps {
  lastUpdate: DateTime
}

/**
 * Render the footer of the Calendar organisms.
 */
const CalendarFooter = ({ lastUpdate }: CalendarFooterProps): JSX.Element => {
  return (
    <Wrapper>
      <Typography variant="caption">
        Last update: {lastUpdate.toFormat('yyyy-MM-dd, HH:mm:ss')}
      </Typography>
    </Wrapper>
  )
}

export default CalendarFooter
