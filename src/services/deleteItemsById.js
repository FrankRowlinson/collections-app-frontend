import axios from 'axios'

export async function deleteItemsById(ids) {
  const response = await axios.delete('items', {
    data: { ids },
  })
  return response
}
