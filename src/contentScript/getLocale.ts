const USER_PREFERENCES_LOCAL_STORAGE = 'ajs_user_traits'

/**
 * Retrieve the user locale preference from the local storage.
 * @returns user locale
 */
export const getLocale = () => {
  const stringLocalPreferences =
    localStorage.getItem(USER_PREFERENCES_LOCAL_STORAGE) || '{}'
  const localPreferences = JSON.parse(stringLocalPreferences)
  const locale = localPreferences?.language_preference as string | undefined

  if (!locale)
    throw new Error(
      `Can't find any locale in LocalStorage with key: '${USER_PREFERENCES_LOCAL_STORAGE}'`
    )

  return locale
}
