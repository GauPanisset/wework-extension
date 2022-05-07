import { Tooltip as MuiTooltip } from '@mui/material'
import styled from 'styled-components'

/**
 * Helper component passing the styled-components className to the Popper component of the Tooltip.
 */
const TooltipToPopper = (props: any) => (
  <MuiTooltip classes={{ popper: props.className }} {...props} />
)

const Wrapper = styled(TooltipToPopper)`
  & .MuiTooltip-tooltip {
    background-color: ${({ theme }) => theme.palette.text.primary};
    color: ${({ theme }) => theme.palette.primary.dark};
  }
`

interface TooltipProps {
  children: React.ReactElement
  /**
   * Text to display in the Tooltip.
   */
  title: string
}

/**
 * Implement the style of a Tooltip base on MUI component.
 */
const Tooltip = ({ children, title, ...props }: TooltipProps): JSX.Element => {
  return (
    <Wrapper title={title} {...props}>
      {children}
    </Wrapper>
  )
}

export default Tooltip
