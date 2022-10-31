import axios from 'axios'

export function getCollection(id) {
  const fetchData = async () => {
    const response = await axios.get(`collections/byId/${id}`)
    return response.data
  }
  return fetchData
}

export async function getCollections() {
  const response = await axios.get('collections')
  return response.data
}
