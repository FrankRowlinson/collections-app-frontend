import axios from 'axios'

export async function like(itemId: string) {
  const response = await axios.post('likes', { itemId })
  return response.data
}
