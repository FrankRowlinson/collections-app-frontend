import axios from 'axios'

function search(query) {
  const fetchData = async ({ pageParam = 1 }) => {
    const response = await axios.get('search', {
      params: { search: query, page: pageParam },
    })
    return response.data
  }
  return fetchData
}

export default search