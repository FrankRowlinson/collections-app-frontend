import axios from 'axios'

export async function getItemFields(id: string) {
  const response = await axios.get(`collections/fields/${id}`)
  return response.data
}
