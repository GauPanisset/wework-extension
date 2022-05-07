import { Typography } from '@mui/material'
import { AccessTimeRounded } from '@mui/icons-material'
import { DateTime } from 'luxon'
import styled from 'styled-components'

import { Reservable } from 'interfaces'

const Wrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  margin-top: 4px;
  padding-top: 4px;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 10%;
    width: 80%;
    border-top: 0.5px solid currentColor;
  }
`

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`

const Circle = styled.div`
  height: 10px;
  width: 10px;

  margin: 0 1px;

  background-color: ${({ theme }) => theme.palette.primary.dark};
  border: 1px solid ${({ theme }) => theme.palette.background.paper};
  border-radius: 50%;
`

interface ConferenceRoomDetailsProps {
  reservable: Reservable
  startDate: DateTime
  finishDate: DateTime
}

/**
 * Format the start and finish times
 * @param start start time
 * @param end end time
 */
const formatStartToEnd = (start: DateTime, end: DateTime) => {
  return `${start.toFormat('HH:mm')} - ${end.toFormat('HH:mm')}`
}

/**
 * Render the details of a booked conference room.
 * It meant to be used in the Tooltip title.
 */
const ConferenceRoomDetails = ({
  reservable,
  startDate,
  finishDate,
}: ConferenceRoomDetailsProps): JSX.Element => {
  return (
    <Wrapper>
      <RowWrapper>
        <Circle />
        <Typography variant="caption">{reservable.name}</Typography>
      </RowWrapper>
      <RowWrapper>
        <AccessTimeRounded sx={{ fontSize: 14 }} />
        <Typography variant="caption">
          {formatStartToEnd(startDate, finishDate)}
        </Typography>
      </RowWrapper>
    </Wrapper>
  )
}

export default ConferenceRoomDetails
