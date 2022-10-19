import axios from 'axios'

export async function getItemProps(id) {
  const fieldsResponse = await axios.get(`collections/fields/${id}`)
  const tagsResponse = await axios.get('items/tags')
  console.log(fieldsResponse)
  return { fields: fieldsResponse.data.fields, tags: tagsResponse.data.tags }
}
