import MuiThemeProvider from '@mui/material/styles/ThemeProvider'
import useMediaQuery from '@mui/material/useMediaQuery'
import React from 'react'

import { ThemeMode } from 'enums'
import { createThemeWithMode } from 'styles'

interface ThemeModeContextValue {
  switchThemeMode: () => void
}

const ThemeModeContext = React.createContext<ThemeModeContextValue>({
  switchThemeMode: () => {},
})

export const useThemeModeContext = () => React.useContext(ThemeModeContext)

interface ThemeProviderProps {
  children: React.ReactNode
}

/**
 * Store the theme mode of the application.
 * It exposes a function enabling to the switch from dark to light mode.
 */
const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [themeMode, setThemeMode] = React.useState<ThemeMode>()

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  /**
   * Keep track of the prefers color scheme.
   * If a theme mode has been saved in the Chrome Storage, it is used as initial value.
   */
  React.useEffect(() => {
    const themeMode = prefersDarkMode ? ThemeMode.Dark : ThemeMode.Light

    const retrieveThemeMode = async () => {
      const localStorage = await chrome.storage.local.get(['themeMode'])
      setThemeMode(localStorage?.themeMode || themeMode)
    }

    if (chrome?.storage) {
      retrieveThemeMode()
    } else {
      setThemeMode(themeMode)
    }
  }, [prefersDarkMode, setThemeMode])

  /**
   * Update the Chrome Storage accordingly to the theme mode.
   */
  React.useEffect(() => {
    if (chrome?.storage) {
      chrome.storage.local.set({ themeMode })
    }
  }, [themeMode])

  const themeModeContext = React.useMemo<ThemeModeContextValue>(
    () => ({
      switchThemeMode: () =>
        setThemeMode((prevThemeMode) =>
          prevThemeMode === ThemeMode.Dark ? ThemeMode.Light : ThemeMode.Dark
        ),
    }),
    []
  )

  /**
   * The theme can be `undefined` until the theme mode has been initialized.
   * But nothing is render while the theme is not created.
   */
  const theme = React.useMemo(() => {
    if (themeMode) return createThemeWithMode(themeMode)
  }, [themeMode])

  return (
    <ThemeModeContext.Provider value={themeModeContext}>
      {theme && <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>}
    </ThemeModeContext.Provider>
  )
}

export default ThemeProvider
