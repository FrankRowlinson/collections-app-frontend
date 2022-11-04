import axios from 'axios'

async function getBiggestCollections() {
  const response = await axios.get('collections/biggest')
  return response.data
}

export default getBiggestCollections