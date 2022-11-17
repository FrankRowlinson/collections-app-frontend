import axios from 'axios'

export async function getTags() {
  const response = await axios.get('tags')
  return response.data
}
