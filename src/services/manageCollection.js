import axios from 'axios'

export async function editCollection(id) {
  console.log('collection been edited')
}

export async function deleteCollection(id) {
  const response = await axios.delete('collections/delete', { params: { id } })
  return response.data
}
