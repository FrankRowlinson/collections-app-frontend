import axios from 'axios'

export async function changeUsersRole(ids, role) {
  const response = await axios.patch('users/changerole', { ids, role })
  return response.data
}

export async function blockUsers(ids) {
  const response = await axios.patch('users/block', { ids })
  return response.data
}

export async function unblockUsers(ids) {
  const response = await axios.patch('users/unblock', { ids })
  return response.data
}

export async function deleteUsers(ids) {
  const response = await axios.delete('users/delete', {
    params: { ids },
  })
  return response.data
}
