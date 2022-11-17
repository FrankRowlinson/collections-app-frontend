import axios from 'axios'

type Credentials = {
  login: string
  password: string
}

export async function authenticateUser(
  credentials: Credentials,
  method: string
) {
  const route = method === 'login' ? 'users/auth' : 'users'
  const response = await axios.post(route, credentials)
  return response.data
}
