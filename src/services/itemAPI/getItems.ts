import axios from 'axios'

export async function getItems(ids: string[]) {
  const response = await axios.get('items', {
    params: { ids },
  })
  return response.data
}
