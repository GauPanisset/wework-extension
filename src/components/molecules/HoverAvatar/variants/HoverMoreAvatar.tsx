import styled from 'styled-components'

import { User } from 'interfaces'

import HoverAvatar from '../'

const TooltipTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`

interface HoverMoreAvatarProps {
  /**
   * List of remaining Users, who can't be displayed in the CalendarBodyCell
   */
  users: User[]
}

/**
 * Render an Avatar which can be hovered to display the list of remaining Users.
 * The Avatar content is the number of remaining Users.
 */
const HoverMoreAvatar = ({ users }: HoverMoreAvatarProps): JSX.Element => {
  const tooltipTitle = (
    <TooltipTitle>
      {users.map((user) => (
        <div key={user.uuid}>{user.name}</div>
      ))}
    </TooltipTitle>
  )

  return (
    <HoverAvatar tooltipTitle={tooltipTitle}>{`+${users.length}`}</HoverAvatar>
  )
}

export default HoverMoreAvatar
