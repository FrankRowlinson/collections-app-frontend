import axios from 'axios'

async function getItems(ids) {
  const response = await axios.get('items', {
    params: { ids },
  })
  return response.data
}

export default getItems
