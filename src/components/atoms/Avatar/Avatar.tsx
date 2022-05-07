import React from 'react'
import { Avatar as MuiAvatar, Badge as MuiBadge } from '@mui/material'
import styled, { keyframes } from 'styled-components'

import { User } from 'interfaces'

const Wrapper = styled(MuiAvatar)`
  height: 32px;
  width: 32px;

  background-color: ${({ theme }) => theme.palette.text.primary};
  color: ${({ theme }) => theme.palette.primary.dark};

  ${({ theme }) => theme.typography.body1}
  font-weight: bold;
`

const ripple = keyframes`
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  20% {
    transform: scale(2.2);
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
`

const StyledBadge = styled(MuiBadge)`
  & .MuiBadge-badge {
    height: 10px;
    width: 10px;

    background-color: ${({ theme }) => theme.palette.primary.dark};
    border: 1px solid ${({ theme }) => theme.palette.background.paper};
    border-radius: 50%;

    &:after {
      box-sizing: border-box;
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      animation: 6s ${ripple} infinite ease-in-out;
      border: 1px solid ${({ theme }) => theme.palette.primary.dark};
      border-radius: 50%;
    }
  }
`

interface AvatarProps {
  /**
   * User related to the avatar to display.
   */
  user: User
  withBadge?: boolean
}

/**
 * Render the avatar of a given user.
 * The letter in the avatar is based on the user's name.
 *
 * It has a forwardRef to be used with Tooltip.
 */
const Avatar = React.forwardRef(
  (
    { user, withBadge = false, ...props }: AvatarProps,
    ref: any
  ): JSX.Element => {
    const [firstName, lastName] = user.name.split(' ')

    const avatar = (
      <Wrapper ref={ref} {...props}>{`${firstName[0]}${lastName[0]}`}</Wrapper>
    )

    if (withBadge)
      return (
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant="dot"
        >
          {avatar}
        </StyledBadge>
      )
    return avatar
  }
)

export default Avatar
