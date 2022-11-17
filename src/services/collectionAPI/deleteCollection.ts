import axios from 'axios'

export async function deleteCollection(id: string) {
  const response = await axios.delete('collections/delete', { params: { id } })
  return response.data
}
