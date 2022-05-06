import { Avatar as MuiAvatar } from '@mui/material'
import styled from 'styled-components'

import { User } from 'interfaces'

const Wrapper = styled(MuiAvatar)`
  height: 32px;
  width: 32px;

  background-color: ${({ theme }) => theme.palette.text.primary};
  color: ${({ theme }) => theme.palette.primary.dark};

  ${({ theme }) => theme.typography.body1}
  font-weight: bold;
`

interface AvatarProps {
  /**
   * User related to the avatar to display.
   */
  user: User
}

/**
 * Render the avatar of a given user.
 * The letter in the avatar is based on the user's name.
 */
const Avatar = ({ user }: AvatarProps): JSX.Element => {
  const [firstName, lastName] = user.name.split(' ')

  return <Wrapper>{`${firstName[0]}${lastName[0]}`}</Wrapper>
}

export default Avatar
