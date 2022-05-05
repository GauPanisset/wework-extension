const AUTH_0_LOCAL_STORAGE =
  '@@auth0spajs@@::ssINyYvYoBHSW8pOcoAE0f5Kzrbd6cmb::wework::openid profile email offline_access'
const DELAY = 500

/**
 * Retrieve access token (JWT) from the local storage.
 * @returns access token
 */
export const getAccessToken = async (
  timeout: number = 10000
): Promise<string | undefined> => {
  const stringLocalAuth = localStorage.getItem(AUTH_0_LOCAL_STORAGE) || '{}'
  const localAuth = JSON.parse(stringLocalAuth)
  const accessToken = localAuth?.body?.access_token as string | undefined

  if (!accessToken && timeout) {
    return await new Promise((resolve) =>
      setTimeout(() => resolve(getAccessToken(timeout - DELAY)), DELAY)
    )
  }

  return accessToken
}
