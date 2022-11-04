import axios from 'axios'

function getCollection(id) {
  const fetchData = async () => {
    const response = await axios.get(`collections/byId/${id}`)
    return response.data
  }
  return fetchData
}

export default getCollection
