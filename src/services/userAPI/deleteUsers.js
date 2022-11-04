import axios from 'axios'

async function deleteUsers(ids) {
  const response = await axios.delete('users/delete', {
    params: { ids },
  })
  return response.data
}

export default deleteUsers