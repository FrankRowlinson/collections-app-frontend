import axios from 'axios'

async function getItem(id) {
  const response = await axios.get('/items/unique', { params: { id } })
  return response.data
}

export default getItem
