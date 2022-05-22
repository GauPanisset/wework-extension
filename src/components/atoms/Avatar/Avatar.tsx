import React from 'react'
import MuiAvatar from '@mui/material/Avatar'
import MuiBadge from '@mui/material/Badge'
import styled, { keyframes } from 'styled-components'

import { ThemeMode } from 'enums'

const Wrapper = styled(MuiAvatar)`
  height: 32px;
  width: 32px;

  background-color: ${({ theme }) =>
    theme.palette.mode === ThemeMode.Dark
      ? theme.palette.text.primary
      : theme.palette.background.paper};
  color: ${({ theme }) =>
    theme.palette.mode === ThemeMode.Dark
      ? theme.palette.primary.dark
      : theme.palette.primary.main};

  border: ${({ theme }) =>
    theme.palette.mode === ThemeMode.Dark
      ? 'none'
      : `1px solid ${theme.palette.text.primary}`};
  box-sizing: border-box;

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

    background-color: ${({ theme }) =>
      theme.palette.mode === ThemeMode.Dark
        ? theme.palette.primary.dark
        : theme.palette.primary.main};
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
      border: 1px solid
        ${({ theme }) =>
          theme.palette.mode === ThemeMode.Dark
            ? theme.palette.primary.dark
            : theme.palette.primary.main};
      border-radius: 50%;
    }
  }
`

interface AvatarProps {
  children: React.ReactNode
  /**
   * Wether a badge should be displayed on the bottom right corner or not.
   */
  withBadge?: boolean
}

/**
 * Render an Avatar with optionally a primary Badge on the bottom right corner.
 *
 * It has a forwardRef to be used with Tooltip.
 */
const Avatar = React.forwardRef(
  ({ withBadge = false, ...props }: AvatarProps, ref: any): JSX.Element => {
    const avatar = <Wrapper ref={ref} {...props} />

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
