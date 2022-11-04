import axios from 'axios'

async function blockUsers(ids) {
  const response = await axios.patch('users/block', { ids })
  return response.data
}

export default blockUsers