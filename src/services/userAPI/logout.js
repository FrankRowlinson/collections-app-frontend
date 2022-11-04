import axios from 'axios'

async function logout() {
  const response = await axios.post('users/logout')
  return response.data
}

export default logout
