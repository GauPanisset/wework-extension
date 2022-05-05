import { UserPreferences } from 'interfaces'

const USER_PREFERENCES_LOCAL_STORAGE = 'ajs_user_traits'

/**
 * Retrieve the user preferences from the local storage.
 */
export const getUserPreferences = (): UserPreferences => {
  const stringLocalPreferences =
    localStorage.getItem(USER_PREFERENCES_LOCAL_STORAGE) || '{}'
  const localPreferences = JSON.parse(stringLocalPreferences)

  const locale = localPreferences?.language_preference
  const companyUuid = localPreferences?.selected_company_uuid

  if (!locale)
    throw new Error(
      `Can't find any locale in LocalStorage with key: '${USER_PREFERENCES_LOCAL_STORAGE}'`
    )
  if (!companyUuid)
    throw new Error(
      `Can't find any companyUuid in LocalStorage with key: '${USER_PREFERENCES_LOCAL_STORAGE}'`
    )

  return { companyUuid, locale }
}
