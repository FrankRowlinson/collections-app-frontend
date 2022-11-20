import axios from 'axios'

export async function blockUsers(ids: (string | undefined)[]) {
  const response = await axios.patch('users/block', { ids })
  return response.data
}
