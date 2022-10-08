import axios from 'axios'

export async function authenticateUser(credentials, method) {
  const route = method === 'login' ? 'users/auth' : 'users'
  const response = await axios
    .post(`${process.env.REACT_APP_HOST}${route}`, credentials)
    .then((res) => {
      return res
    })
    .catch((_) => ({
      data: { status: 'error', error: 'Username or password are wrong' },
    }))
  return response.data
}

export async function getUser() {
  const response = await axios.get(`${process.env.REACT_APP_HOST}users`)
  return response.data
}

export async function logout() {
  const response = await axios.post(`${process.env.REACT_APP_HOST}users/logout`)
  return response.data
}
