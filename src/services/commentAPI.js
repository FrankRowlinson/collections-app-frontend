import axios from 'axios'

export function getComments(itemId) {
  const fetchData = async () => {
    const response = await axios.get('items/comments', { params: { itemId } })
    return response.data
  }
  return fetchData
}

export async function createComment(itemId, fieldData) {
  const data = { itemId: itemId, text: fieldData.commentField }
  const response = await axios.post('items/comments', data)
  return response.data
}
