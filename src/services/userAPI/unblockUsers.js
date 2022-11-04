import axios from 'axios'

async function unblockUsers(ids) {
  const response = await axios.patch('users/unblock', { ids })
  return response.data
}

export default unblockUsers
