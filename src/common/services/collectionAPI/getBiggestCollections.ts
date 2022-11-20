import axios from 'axios'

export async function getBiggestCollections() {
  const response = await axios.get('collections/biggest')
  return response.data
}
