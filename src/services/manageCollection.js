import axios from 'axios'

export async function editCollection(id, data) {
  const response = await axios.patch('collections/edit', { id, ...data })
  return response.data
}

export async function deleteCollection(id) {
  const response = await axios.delete('collections/delete', { params: { id } })
  return response.data
}
