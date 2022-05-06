import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  display: flex;

  height: 72px;
  width: 112px;
  padding: 8px;

  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;

    margin: 8px 0;

    width: 1px;
    height: calc(100% - 2 * 8px);

    background-color: ${({ theme }) => theme.palette.primary.light};
    border-radius: 1px;
  }

  &:last-child {
    &::after {
      display: none;
    }
  }
`

interface CellProps {
  children: React.ReactNode
}

/**
 * Render a container with a divider on the right side.
 * It is meant to be used as a row cell.
 */
const Cell = ({ children, ...props }: CellProps): JSX.Element => {
  return <Wrapper {...props}>{children}</Wrapper>
}

export default Cell
