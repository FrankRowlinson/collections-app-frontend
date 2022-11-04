import axios from 'axios'

async function createComment(itemId, fieldData) {
  const data = { itemId: itemId, text: fieldData.commentField }
  const response = await axios.post('comments', data)
  return response.data
}

export default createComment
