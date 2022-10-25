import axios from 'axios'

async function getRecentItems() {
  const response = await axios.get('items/recent')
  return response.data
}

export default getRecentItems