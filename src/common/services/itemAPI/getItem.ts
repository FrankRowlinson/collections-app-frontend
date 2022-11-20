import axios from 'axios'

export function getItem(id: string) {
  const fetchData = async () => {
    const response = await axios.get('/items/unique', { params: { id } })
    return response.data
  }
  return fetchData
}
