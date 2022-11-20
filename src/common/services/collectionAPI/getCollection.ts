import axios from 'axios'

export function getCollection(id: string) {
  const fetchData = async () => {
    const response = await axios.get(`collections/byId/${id}`)
    return response.data
  }
  return fetchData
}
