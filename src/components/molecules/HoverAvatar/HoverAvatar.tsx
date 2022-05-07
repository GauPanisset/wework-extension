import Avatar from 'components/atoms/Avatar'
import Tooltip from 'components/atoms/Tooltip'
import { ReservableType } from 'enums'
import { Reservable, User } from 'interfaces'

interface HoverAvatarProps {
  reservable: Reservable
  /**
   * User related to the avatar to display.
   */
  user: User
}

/**
 * Render a user Avatar which can be hovered to display the full name of the attached user.
 */
const HoverAvatar = ({ user, reservable }: HoverAvatarProps): JSX.Element => {
  const hasConferenceRoom = reservable.type === ReservableType.ConferenceRoom
  return (
    <Tooltip title={user.name}>
      <Avatar user={user} withBadge={hasConferenceRoom} />
    </Tooltip>
  )
}

export default HoverAvatar
