import getItemFields from './collectionAPI/getItemFields'
import getTags from './tagAPI/getTags'

function getItemProps(id) {
  const fetchData = async () => {
    const tagsResponse = await getTags()
    const fieldsResponse = await getItemFields(id)
    return { fields: fieldsResponse.fields, tags: tagsResponse.tags }
  }
  return fetchData
}

export default getItemProps
