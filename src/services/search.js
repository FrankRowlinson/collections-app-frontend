import axios from 'axios'

export async function search(data) {
  const response = await axios.get('search', {
    params: data,
  })
  return response.data
}

export async function searchByTag(tag) {
  const response = await axios.get('search/bytag', {
    params: { tag },
  })
  return response.data
}
