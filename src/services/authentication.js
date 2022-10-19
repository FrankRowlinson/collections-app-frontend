import axios from 'axios'

export async function authenticateUser(credentials, method) {
  const route = method === 'login' ? 'users/auth' : 'users'
  const response = await axios.post(route, credentials)
  console.log(response.data)
  return response.data
}

export async function getUser() {
  const response = await axios.get('users')
  return response.data
}

export async function logout() {
  const response = await axios.post('users/logout')
  return response.data
}
