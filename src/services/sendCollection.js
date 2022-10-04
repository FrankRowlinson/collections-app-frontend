import axios from 'axios'


export async function sendCollection(data) {
  const res = await axios.post(`${process.env.REACT_APP_HOST}collections`, data)
  return res
}