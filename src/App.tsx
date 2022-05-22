import Layout from 'components/atoms/Layout'
import Calendar from 'components/organisms/Calendar'
import ThemeProvider from 'components/providers/ThemeProvider'
import { GlobalStyle } from 'styles'

const App = () => {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <Layout>
        <Calendar />
      </Layout>
    </ThemeProvider>
  )
}

export default App
