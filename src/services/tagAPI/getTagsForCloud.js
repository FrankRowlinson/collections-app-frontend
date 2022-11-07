import axios from 'axios'

async function getTagsForCloud() {
  const response = await axios.get('tags/cloud')
  return transformTagsForCloud(response.data.tags)
}

const transformTagsForCloud = (tags) => {
  return {
    tags: tags.map((el) => {
      return {
        value: el.name,
        count: el._count.items,
        key: el.id,
      }
    }),
  }
}

export default getTagsForCloud
