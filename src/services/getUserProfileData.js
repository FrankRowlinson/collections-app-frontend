import axios from 'axios'

async function getUserProfileData(id) {
  const response = await axios.get('/users/profile', { params: { id } })
  console.log('server is asked for profile data of', id)
  return response.data
}

export default getUserProfileData