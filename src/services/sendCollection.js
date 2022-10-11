import axios from 'axios'


export async function sendCollection(data) {
  const formData = new FormData()
  data['collection-image'] && formData.append('img', data['collection-image'][0])
  formData.append('data', JSON.stringify(data))
  const res = await axios.post(`${process.env.REACT_APP_HOST}collections`, formData)
  return res
}