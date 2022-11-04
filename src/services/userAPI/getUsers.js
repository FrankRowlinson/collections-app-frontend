import axios from 'axios'

async function getUsers() {
  const response = await axios.get('users/list')
  return response.data
}

export default getUsers
