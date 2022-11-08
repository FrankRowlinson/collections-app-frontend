import axios from 'axios'

async function createCollection(data) {
  const formData = new FormData()
  data['collection-image'] &&
    formData.append('img', data['collection-image'][0])
  formData.append('data', JSON.stringify(data))
  const res = await axios.post('collections', formData)
  return res
}

export default createCollection