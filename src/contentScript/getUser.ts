import { User } from 'interfaces'

const cachedUsers: Record<string, User> = {}

/**
 * Retrieve a WeWork user by its uuid.
 * @param accessToken JWT access token
 * @param userUuid uuid of the user to retrieve
 */
export const getUser = async (
  accessToken: string,
  userUuid: string
): Promise<User> => {
  const cachedUser = cachedUsers[userUuid]
  if (cachedUser) return cachedUser

  const url = `https://membersapi.wework.com/api/v11/users/${userUuid}`
  const response = await fetch(url, {
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${accessToken}`,
    },
  })

  const { result } = await response.json()

  const user = { name: result?.name || '', uuid: userUuid }
  cachedUsers[userUuid] = user

  return user
}
