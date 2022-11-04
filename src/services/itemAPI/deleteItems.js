import axios from 'axios'

export async function deleteItems(ids) {
  const response = await axios.delete('items', {
    data: { ids },
  })
  return response
}

export default deleteItems
