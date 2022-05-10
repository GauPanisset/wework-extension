import ThemeProvider from '@mui/material/styles/ThemeProvider'

import Layout from 'components/atoms/Layout'
import Calendar from 'components/organisms/Calendar'
import { theme, GlobalStyle } from 'styles'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout>
        <Calendar />
      </Layout>
    </ThemeProvider>
  )
}

export default App
