import axios from 'axios'

export async function deleteItemsById(ids) {
  const response = axios.delete(`${process.env.REACT_APP_HOST}items`, {
    data: { ids },
  })
  console.log(response)
}
