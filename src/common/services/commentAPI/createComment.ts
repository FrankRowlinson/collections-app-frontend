import axios from 'axios'

type FieldData = {
  commentField: string
}

export async function createComment(itemId: string, fieldData: FieldData) {
  const data = { itemId: itemId, text: fieldData.commentField }
  const response = await axios.post('comments', data)
  return response.data
}
