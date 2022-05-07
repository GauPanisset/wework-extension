import styled from 'styled-components'

const Wrapper = styled.div`
  box-sizing: border-box;

  /**
   * Default Google Chrome Extension popup dimensions.
   * 800x600
   */
  height: 600px;
  width: fit-content;

  padding: 8px 8px 0;

  background-color: ${({ theme }) => theme.palette.background.paper};
`

interface LayoutProps {
  children: React.ReactNode
}

/**
 * Render the popup layout with its background color and padding.
 */
const Layout = ({ children }: LayoutProps) => {
  return <Wrapper>{children}</Wrapper>
}

export default Layout
