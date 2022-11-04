import axios from 'axios'

async function getUserProfileData(id) {
  const response = await axios.get('/users/profile', { params: { id } })
  return response.data
}

export default getUserProfileData
