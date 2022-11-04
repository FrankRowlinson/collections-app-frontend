import axios from 'axios'

async function getItemFields(id) {
  const response = await axios.get(`collections/fields/${id}`)
  return response.data
}

export default getItemFields
