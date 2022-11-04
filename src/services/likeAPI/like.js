import axios from 'axios'

async function like(itemId) {
  const response = await axios.post('likes', { itemId })
  return response.data
}

export default like