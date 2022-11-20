import axios from 'axios'

export async function getCollections() {
  const response = await axios.get('collections')
  return response.data
}
