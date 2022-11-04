import axios from 'axios'

async function editCollection(id, data) {
  const response = await axios.patch('collections/edit', { id, ...data })
  return response.data
}

export default editCollection