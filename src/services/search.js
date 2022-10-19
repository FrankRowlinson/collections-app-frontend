import axios from 'axios'

export async function search(data) {
  const response = await axios.get('search', {
    params: data,
  })
  return response.data
}
