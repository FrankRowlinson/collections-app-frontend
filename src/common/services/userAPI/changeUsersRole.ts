import axios from 'axios'

export async function changeUsersRole(ids: (string | undefined)[], role: string) {
  const response = await axios.patch('users/changerole', { ids, role })
  return response.data
}
