import React from 'react'

import { Theme } from 'enums'

/**
 * Retrieve the prefers color scheme (dark or light mode) of the user.
 * Keep track of the prefers color scheme and store this theme in Chrome storage.
 */
export const useDarkMode = () => {
  React.useEffect(() => {
    if (chrome?.storage && window.matchMedia) {
      const initializeDarkMode = async (): Promise<void> => {
        const theme = window.matchMedia('(prefers-color-scheme: dark)').matches
          ? Theme.Dark
          : Theme.Light
        await chrome.storage.local.set({ theme })
      }

      initializeDarkMode()

      const darkModeListener = (event: MediaQueryListEvent) => {
        const theme = event.matches ? Theme.Dark : Theme.Light
        chrome.storage.local.set({ theme })
      }

      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', darkModeListener)

      return () =>
        window
          .matchMedia('(prefers-color-scheme: dark)')
          .removeEventListener('change', darkModeListener)
    }
  }, [])
}
