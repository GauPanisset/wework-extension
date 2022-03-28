const AUTH_0_LOCAL_STORAGE =
  '@@auth0spajs@@::ssINyYvYoBHSW8pOcoAE0f5Kzrbd6cmb::wework::openid profile email offline_access'

/**
 * Retrieve access token (JWT) from the local storage.
 * @returns access token
 */
export const getAccessToken = (): string => {
  const stringLocalAuth = localStorage.getItem(AUTH_0_LOCAL_STORAGE) || '{}'
  const localAuth = JSON.parse(stringLocalAuth)
  const accessToken = localAuth?.body?.access_token as string | undefined

  if (!accessToken)
    throw new Error(
      `Can't find any access token in LocalStorage with key: '${AUTH_0_LOCAL_STORAGE}'`
    )

  return accessToken
}
