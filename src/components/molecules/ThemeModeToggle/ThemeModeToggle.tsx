import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'

import Tooltip from 'components/atoms/Tooltip'
import { useThemeModeContext } from 'components/providers/ThemeProvider'
import { ThemeMode } from 'enums'

/**
 * Render a toggle button with enable the user to switch from one theme mode to another.
 */
const ThemeModeToggle = () => {
  const theme = useTheme()
  const { switchThemeMode } = useThemeModeContext()

  return (
    <Tooltip
      title={
        theme.palette.mode === ThemeMode.Dark
          ? 'Switch to light mode'
          : 'Switch to dark mode'
      }
    >
      <IconButton onClick={switchThemeMode}>
        {theme.palette.mode === ThemeMode.Dark ? (
          <LightModeIcon />
        ) : (
          <DarkModeIcon />
        )}
      </IconButton>
    </Tooltip>
  )
}

export default ThemeModeToggle
