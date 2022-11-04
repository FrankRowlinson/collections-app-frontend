import axios from 'axios'

async function getCurrentUser() {
  const response = await axios.get('users')
  return response.data
}

export default getCurrentUser