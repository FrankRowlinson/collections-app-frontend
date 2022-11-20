import axios from 'axios'

export async function deleteUsers(ids: (string | undefined)[]) {
  const response = await axios.delete('users/delete', {
    params: { ids },
  })
  return response.data
}
