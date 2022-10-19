import axios from 'axios'

export async function getItemsById(ids) {
  const response = await axios.get('items', {
    params: { ids },
  })
  return response.data
}
