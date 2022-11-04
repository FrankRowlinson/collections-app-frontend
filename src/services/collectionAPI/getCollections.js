import axios from 'axios'

async function getCollections() {
  const response = await axios.get('collections')
  return response.data
}

export default getCollections