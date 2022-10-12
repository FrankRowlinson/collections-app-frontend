import axios from 'axios'

export async function getItemProps(id) {
  const fieldsResponse = await axios.get(
    `${process.env.REACT_APP_HOST}collections/fields/${id}`
  )
  const tagsResponse = await axios.get(
    `${process.env.REACT_APP_HOST}items/tags`
  )
  return { fields: fieldsResponse.data.fields, tags: tagsResponse.data }
}
