import axios from 'axios'

async function changeUsersRole(ids, role) {
  const response = await axios.patch('users/changerole', { ids, role })
  return response.data
}

export default changeUsersRole