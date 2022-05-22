import { createGlobalStyle } from 'styled-components'
import { createTheme } from '@mui/material/styles'

import { ThemeMode } from 'enums'

import { darkTheme, lightTheme } from './theme'

export const createThemeWithMode = (mode: ThemeMode) =>
  createTheme(mode === ThemeMode.Dark ? darkTheme : lightTheme)

export const GlobalStyle = createGlobalStyle`  
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`
