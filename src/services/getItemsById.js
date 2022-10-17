import axios from 'axios'

export async function getItemsById(ids) {
  const response = await axios.get(`${process.env.REACT_APP_HOST}items`, {
    params: { ids },
  })
  return response.data
}
