import Avatar from 'components/atoms/Avatar'
import Tooltip from 'components/atoms/Tooltip'

interface HoverAvatarProps {
  children: React.ReactNode
  /**
   * Content displayed in the tooltip shown on hover.
   */
  tooltipTitle: string | React.ReactElement
  /**
   * Wether a badge should be displayed on the bottom right corner or not.
   */
  withBadge?: boolean
}

/**
 * Render an Avatar which can be hovered to display a Tooltip containing more information.
 */
const HoverAvatar = ({
  children,
  tooltipTitle,
  withBadge = false,
}: HoverAvatarProps): JSX.Element => {
  return (
    <Tooltip title={tooltipTitle}>
      <Avatar withBadge={withBadge}>{children}</Avatar>
    </Tooltip>
  )
}

export default HoverAvatar
