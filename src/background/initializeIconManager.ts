import { Theme } from 'enums'
import { StorageChanges } from 'types'

enum LogoState {
  Active,
  Disabled,
}

const iconPaths = {
  [Theme.Light]: {
    [LogoState.Active]: `../../wework-logo-dark.png`,
    [LogoState.Disabled]: `../../wework-logo-dark-disabled.png`,
  },
  [Theme.Dark]: {
    [LogoState.Active]: `../../wework-logo-light.png`,
    [LogoState.Disabled]: `../../wework-logo-light-disabled.png`,
  },
}

/**
 * Update the icon based on the current tab.
 * The icon is `LogoState.Disabled` when the tab is not on the WeWork domain.
 * Handle the Theme color of the icon.
 * @param tabId id of the current tab
 */
const updateIcon = async (tabId: number, _theme?: Theme): Promise<void> => {
  const tab = await chrome.tabs.get(tabId)
  const { url } = tab

  let theme: Theme
  if (!_theme) {
    const localStorage = await chrome.storage.local.get('theme')
    theme = localStorage?.theme || Theme.Light
  } else {
    theme = _theme
  }

  const state = url?.match(/wework\.com/g)
    ? LogoState.Active
    : LogoState.Disabled

  chrome.action.setIcon({
    path: iconPaths[theme][state],
    tabId,
  })
}

/**
 * Add listeners updating extension icon.
 */
export const initializeIconManager = () => {
  chrome.tabs.onActivated.addListener(
    (activeInfo: chrome.tabs.TabActiveInfo) => {
      const { tabId } = activeInfo
      updateIcon(tabId)
    }
  )

  chrome.tabs.onUpdated.addListener((tabId: number) => {
    updateIcon(tabId)
  })

  chrome.storage.onChanged.addListener((changes: StorageChanges) => {
    if (changes.theme) {
      const theme: Theme = changes.theme.newValue
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tabId = tabs[0]?.id as number
        updateIcon(tabId, theme)
      })
    }
  })
}
