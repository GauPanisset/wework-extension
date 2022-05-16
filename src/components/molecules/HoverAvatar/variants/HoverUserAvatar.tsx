import { DateTime } from 'luxon'
import styled from 'styled-components'

import ConferenceRoomDetails from 'components/molecules/ConferenceRoomDetails'
import { ReservableType } from 'enums'
import { Reservation } from 'interfaces'

import HoverAvatar from '../'

const TooltipTitle = styled.div`
  text-align: center;
`

interface HoverUserAvatarProps {
  /**
   * Reservation information to display.
   */
  reservation: Reservation
}

/**
 * Render an Avatar which can be hovered to display the User full name and the conference room if any.
 * The Avatar content is the first letters of the user's first and last name.
 */
const HoverUserAvatar = ({
  reservation,
}: HoverUserAvatarProps): JSX.Element => {
  const { dates, location, reservable, user } = reservation
  const [firstName, lastName] = user.name.split(' ')

  const hasConferenceRoom = reservable.type === ReservableType.ConferenceRoom

  const tooltipTitle = (
    <>
      <TooltipTitle>{user.name}</TooltipTitle>
      {hasConferenceRoom && (
        <ConferenceRoomDetails
          reservable={reservable}
          startDate={DateTime.fromISO(dates.start).setZone(location.timeZone)}
          finishDate={DateTime.fromISO(dates.finish).setZone(location.timeZone)}
        />
      )}
    </>
  )

  return (
    <HoverAvatar
      tooltipTitle={tooltipTitle}
      withBadge={hasConferenceRoom}
    >{`${firstName[0]}${lastName[0]}`}</HoverAvatar>
  )
}

export default HoverUserAvatar
