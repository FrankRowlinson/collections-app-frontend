import axios from 'axios'

function searchByTag(query) {
  const fetchData = async ({ pageParam = 1 }) => {
    const response = await axios.get('search/bytag', {
      params: { tag: query, page: pageParam },
    })
    return response.data
  }
  return fetchData
}

export default searchByTag