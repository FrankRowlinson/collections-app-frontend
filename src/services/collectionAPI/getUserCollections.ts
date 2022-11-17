import axios from 'axios'

export function getUserCollections(id: string) {
  const fetchData = async ({ pageParam = 1 }) => {
    const response = await axios.get(`/collections/userCollections/${id}`, {
      params: { page: pageParam },
    })
    return response.data
  }
  return fetchData
}
