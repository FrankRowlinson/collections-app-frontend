import axios from 'axios'

function getItem(id) {
  const fetchData = async () => {
    const response = await axios.get('/items/unique', { params: { id } })
    return response.data
  }
  return fetchData
}

export default getItem
