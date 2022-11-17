import axios from 'axios'

export function searchByTag(query: string) {
  const fetchData = async ({ pageParam = 1 }) => {
    const response = await axios.get('search/bytag', {
      params: { tag: query, page: pageParam },
    })
    return response.data
  }
  return fetchData
}
