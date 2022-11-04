import axios from 'axios'

function getUserCollections(id) {
  const fetchData = async ({ pageParam = 1 }) => {
    const response = await axios.get(`/collections/userCollections/${id}`, {
      params: { page: pageParam },
    })
    return response.data
  }
  return fetchData
}

export default getUserCollections
