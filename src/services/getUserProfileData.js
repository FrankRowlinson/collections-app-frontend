import axios from 'axios'

export async function getUserProfileData(id) {
  const response = await axios.get('/users/profile', { params: { id } })
  return response.data
}

export function getUserCollections(id) {
  const fetchData = async ({ pageParam = 1 }) => {
    const response = await axios.get(`/collections/userCollections/${id}`, {
      params: { page: pageParam },
    })
    return response.data
  }
  return fetchData
}

export default getUserProfileData
