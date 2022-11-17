import axios from 'axios'

export async function unblockUsers(ids: (string | undefined)[]) {
  const response = await axios.patch('users/unblock', { ids })
  return response.data
}
