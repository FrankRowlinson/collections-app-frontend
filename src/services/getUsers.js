import axios from 'axios'

export async function getUsers() {
  const response = await axios.get(`${process.env.REACT_APP_HOST}users/list`)
  return response.data
}
