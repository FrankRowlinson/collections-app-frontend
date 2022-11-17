import axios from 'axios'

export async function deleteItems(ids: string[]) {
  const response = await axios.delete('items', {
    data: { ids },
  })
  return response
}
