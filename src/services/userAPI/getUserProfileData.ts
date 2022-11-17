import axios from 'axios'

export function getUserProfileData(id: string) {
  const fetchData = async () => {
    const response = await axios.get('/users/profile', { params: { id } })
    return response.data
  }
  return fetchData
}
