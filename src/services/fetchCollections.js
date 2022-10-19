import axios from 'axios'

export async function getCollection(id) {
  const response = await axios.get(`collections/byId/${id}`)
  return response.data
}

export async function getCollections() {
  const response = await axios.get('collections')
  return response.data
}

export async function getBiggestCollections() {
  const response = await axios.get('collections/biggest')
  return response.data
}

export async function getCollectionsByUser(id) {
  const response = await axios.get(
    `collections/userCollections${id ? `/${id}` : ''}`
  )
  return response.data
}
