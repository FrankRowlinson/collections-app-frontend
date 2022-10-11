import axios from 'axios'

export async function getCollection(id) {
  const response = await axios.get(
    `${process.env.REACT_APP_HOST}collections/byId/${id}`
  )
  return response.data
}

export async function getCollections() {
  const response = await axios.get(`${process.env.REACT_APP_HOST}collections`)
  return response.data
}

export async function getBiggestCollections() {
  const response = await axios.get(
    `${process.env.REACT_APP_HOST}collections/biggest`
  )
  return response.data
}

export async function getCollectionsByUser(id) {
  const response = await axios.get(
    `${process.env.REACT_APP_HOST}collections/userCollections${id ? `/${id}` : ''}`
  )
  return response.data
}
