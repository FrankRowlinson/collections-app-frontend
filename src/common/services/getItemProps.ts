import { getItemFields } from './collectionAPI'
import { getTags } from './tagAPI'

export function getItemProps(id: string) {
  const fetchData = async () => {
    const tagsResponse = await getTags()
    const fieldsResponse = await getItemFields(id)
    return { fields: fieldsResponse.fields, tags: tagsResponse.tags }
  }
  return fetchData
}
