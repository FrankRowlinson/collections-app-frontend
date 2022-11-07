import axios from 'axios'

function getUserProfileData(id) {
  const fetchData = async () => {
    const response = await axios.get('/users/profile', { params: { id } })
    return response.data
  }
  return fetchData
}

export default getUserProfileData
