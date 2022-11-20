import axios from 'axios'

export async function getRecentItems() {
  const response = await axios.get('items/recent')
  return response.data
}
