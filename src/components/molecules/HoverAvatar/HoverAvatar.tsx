import { DateTime } from 'luxon'
import styled from 'styled-components'

import Avatar from 'components/atoms/Avatar'
import Tooltip from 'components/atoms/Tooltip'
import ConferenceRoomDetails from 'components/molecules/ConferenceRoomDetails'
import { ReservableType } from 'enums'
import { Reservable, Reservation, User } from 'interfaces'

const TooltipTitle = styled.div`
  text-align: center;
`

interface HoverAvatarProps {
  reservation: Reservation
  reservable: Reservable
  /**
   * User related to the avatar to display.
   */
  user: User
}

/**
 * Render a user Avatar which can be hovered to display the full name of the attached user.
 */
const HoverAvatar = ({
  reservable,
  reservation,
  user,
}: HoverAvatarProps): JSX.Element => {
  const hasConferenceRoom = reservable.type === ReservableType.ConferenceRoom

  return (
    <Tooltip
      title={
        <>
          <TooltipTitle>{user.name}</TooltipTitle>
          {hasConferenceRoom && (
            <ConferenceRoomDetails
              reservable={reservable}
              startDate={DateTime.fromISO(reservation.dates.start).setZone(
                reservation.location.timeZone
              )}
              finishDate={DateTime.fromISO(reservation.dates.finish).setZone(
                reservation.location.timeZone
              )}
            />
          )}
        </>
      }
    >
      <Avatar user={user} withBadge={hasConferenceRoom} />
    </Tooltip>
  )
}

export default HoverAvatar
