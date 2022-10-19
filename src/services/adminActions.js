import axios from 'axios'

const base_url = `${process.env.REACT_APP_HOST}users/`

export async function changeUsersRole(ids, role) {
  const response = await axios.patch(`${base_url}changerole`, { ids, role })
  return response.data
}

export async function blockUsers(ids) {
  const response = await axios.patch(`${base_url}block`, { ids })
  return response.data
}

export async function unblockUsers(ids) {
  const response = await axios.patch(`${base_url}unblock`, { ids })
  return response.data
}

export async function deleteUsers(ids) {
  const response = await axios.delete(`${base_url}delete`, {
    params: { ids },
  })
  return response.data
}
