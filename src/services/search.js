import axios from 'axios'

export async function search(data) {
  const response = await axios.get(`${process.env.REACT_APP_HOST}search`, {
    params: data,
  })
  return response.data
}
