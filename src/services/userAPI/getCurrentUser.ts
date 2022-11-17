import axios from 'axios'

export async function getCurrentUser() {
  const response = await axios.get('users')
  return response.data
}
