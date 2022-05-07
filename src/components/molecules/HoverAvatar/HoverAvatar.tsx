import Avatar from 'components/atoms/Avatar'
import Tooltip from 'components/atoms/Tooltip'
import { User } from 'interfaces'

interface HoverAvatarProps {
  /**
   * User related to the avatar to display.
   */
  user: User
}

/**
 * Render a user Avatar which can be hovered to display the full name of the attached user.
 */
const HoverAvatar = ({ user }: HoverAvatarProps): JSX.Element => {
  return (
    <Tooltip title={user.name}>
      <Avatar user={user} />
    </Tooltip>
  )
}

export default HoverAvatar
