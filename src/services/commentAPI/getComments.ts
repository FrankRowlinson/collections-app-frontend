import axios from 'axios'

export function getComments(itemId: string) {
  const fetchData = async () => {
    const response = await axios.get('comments', { params: { itemId } })
    return response.data
  }
  return fetchData
}
