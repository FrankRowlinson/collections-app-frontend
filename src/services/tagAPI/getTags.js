import axios from 'axios'

async function getTags() {
  const response = await axios.get('tags')
  return response.data
}

export default getTags