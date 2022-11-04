import axios from 'axios'

export function getComments(itemId) {
  const fetchData = async () => {
    const response = await axios.get('comments', { params: { itemId } })
    return response.data
  }
  return fetchData
}

export async function createComment(itemId, fieldData) {
  const data = { itemId: itemId, text: fieldData.commentField }
  const response = await axios.post('comments', data)
  return response.data
}
