import axios from 'axios'

async function dislike(itemId) {
  const response = await axios.delete('likes', { params: { itemId } })
  return response.data
}

export default dislike