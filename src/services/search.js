import axios from 'axios'

export function search(query) {
  const fetchData = async ({ pageParam = 1 }) => {
    const response = await axios.get('search', {
      params: { search: query, page: pageParam },
    })
    return response.data
  }
  return fetchData
}

export function searchByTag(query) {
  const fetchData = async ({ pageParam = 1 }) => {
    const response = await axios.get('search/bytag', {
      params: { tag: query, page: pageParam },
    })
    return response.data
  }
  return fetchData
}
