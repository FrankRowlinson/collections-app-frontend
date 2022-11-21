import axios from 'axios'

export function getFavouriteItems(id: string) {
  const fetchData = async () => {
    const response = await axios.get('items/favourite', { params: { id } })
    return response.data
  }
  return fetchData
}
