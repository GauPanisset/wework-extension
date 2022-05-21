/**
 * Update the icon based on the current tab.
 * @param tabId id of the current tab
 */
const updateIcon = async (tabId: number): Promise<void> => {
  const tab = await chrome.tabs.get(tabId)
  const { url } = tab

  if (url?.match(/wework\.com/g)) {
    chrome.action.setIcon({ path: '../../wework-logo-light.png', tabId })
  } else {
    chrome.action.setIcon({
      path: '../../wework-logo-light-disabled.png',
      tabId,
    })
  }
}

/**
 * Add listeners updating extension icon.
 */
export const createIconManager = () => {
  chrome.tabs.onActivated.addListener(
    (activeInfo: chrome.tabs.TabActiveInfo) => {
      const { tabId } = activeInfo
      updateIcon(tabId)
    }
  )

  chrome.tabs.onUpdated.addListener((tabId: number) => {
    updateIcon(tabId)
  })
}
