import axios from 'axios'

export async function getUsers() {
  const response = await axios.get('users/list')
  return response.data
}
