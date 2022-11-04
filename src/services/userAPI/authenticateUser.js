import axios from 'axios'

async function authenticateUser(credentials, method) {
  const route = method === 'login' ? 'users/auth' : 'users'
  const response = await axios.post(route, credentials)
  return response.data
}

export default authenticateUser