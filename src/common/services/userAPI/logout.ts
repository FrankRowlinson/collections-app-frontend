import axios from 'axios'

export async function logout() {
  const response = await axios.post('users/logout')
  return response.data
}
