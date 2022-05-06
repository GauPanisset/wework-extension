import styled from 'styled-components'

const Wrapper = styled.div`
  height: fit-content;
  width: fit-content;

  background-color: ${({ theme }) => theme.palette.background.paper};
`

interface BackgroundProps {
  children: React.ReactNode
}

/**
 * Render a large colorful surface in the background fitting the content size.
 */
const Background = ({ children }: BackgroundProps) => {
  return <Wrapper>{children}</Wrapper>
}

export default Background
