import axios from 'axios'

function getComments(itemId) {
  const fetchData = async () => {
    const response = await axios.get('comments', { params: { itemId } })
    return response.data
  }
  return fetchData
}

export default getComments