import { ThemeMode } from 'enums'

const baseTheme = {
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: 'Apercu',
    htmlFontSize: 16,
    button: {
      textTransform: 'none' as any,
    },
    h4: {
      fontWeight: 'bold',
    },
  },
}

export const darkTheme = {
  ...baseTheme,
  palette: {
    mode: ThemeMode.Dark,
    primary: {
      contrastText: '#f6f7f9',
      dark: '#666bcb',
      light: '#cdcaff',
      main: '#9999ff',
    },
    background: {
      paper: '#171a21',
    },
    text: {
      primary: '#f6f7f9',
    },
  },
}

export const lightTheme = {
  ...baseTheme,
  palette: {
    mode: ThemeMode.Light,
    primary: {
      contrastText: '#f6f7f9',
      dark: '#0000ca',
      light: '#7142ff',
      main: '#0000ff',
    },
    background: {
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
    },
  },
}
