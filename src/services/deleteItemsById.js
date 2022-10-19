import axios from 'axios'

export async function deleteItemsById(ids) {
  const response = axios.delete('items', {
    data: { ids },
  })
  console.log(response)
}
