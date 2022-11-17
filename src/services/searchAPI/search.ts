import axios from 'axios'

export function search(query: string) {
  const fetchData = async ({ pageParam = 1 }) => {
    const response = await axios.get('search', {
      params: { search: query, page: pageParam },
    })
    return response.data
  }
  return fetchData
}
