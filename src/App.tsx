import { ThemeProvider } from '@mui/material'

import Background from 'components/atoms/Background'
import Calendar from 'components/organisms/Calendar'
import { theme, GlobalStyle } from 'styles'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Background>
        <Calendar />
      </Background>
    </ThemeProvider>
  )
}

export default App
