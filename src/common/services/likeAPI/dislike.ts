import axios from 'axios'

export async function dislike(itemId: string) {
  const response = await axios.delete('likes', { params: { itemId } })
  return response.data
}
