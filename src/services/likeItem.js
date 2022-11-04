import axios from 'axios'

export async function like(itemId) {
  const response = await axios.post('likes', { itemId })
  return response.data
}

export async function dislike(itemId) {
  const response = await axios.delete('likes', { params: { itemId } })
  return response.data
}
