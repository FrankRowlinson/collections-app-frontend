import axios from 'axios'

export async function like(itemId) {
  const response = await axios.post('/items/like', { itemId })
  return response.data
}

export async function dislike(itemId) {
  const response = await axios.delete('/items/like', { params: { itemId } })
  return response.data
}
