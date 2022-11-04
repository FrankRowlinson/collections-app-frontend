import getItemFields from './collectionAPI/getItemFields'
import getTags from './tagAPI/getTags'

async function getItemProps(id) {
  const tagsResponse = await getTags()
  const fieldsResponse = await getItemFields(id)
  return { fields: fieldsResponse.fields, tags: tagsResponse.tags }
}

export default getItemProps
