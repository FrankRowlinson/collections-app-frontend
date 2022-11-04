import axios from 'axios'

async function deleteCollection(id) {
  const response = await axios.delete('collections/delete', { params: { id } })
  return response.data
}

export default deleteCollection
