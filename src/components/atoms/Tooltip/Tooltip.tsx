import MuiTooltip from '@mui/material/Tooltip'
import styled from 'styled-components'

import { ThemeMode } from 'enums'

/**
 * Helper component passing the styled-components className to the Popper component of the Tooltip.
 */
const TooltipToPopper = (props: any) => (
  <MuiTooltip classes={{ popper: props.className }} {...props} />
)

const Wrapper = styled(TooltipToPopper)`
  & .MuiTooltip-tooltip {
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
  }
`

interface TooltipProps {
  children: React.ReactElement
  /**
   * Text to display in the Tooltip.
   */
  title: string | React.ReactElement
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
