import axios from 'axios'

async function getTagsForCloud() {
  const response = await axios.get('tags/cloud')
  return transformTagsForCloud(response.data.tags)
}

const transformTagsForCloud = (tags) => {
  return tags.map((el, index) => {
    return {
      value: el.name,
      count: el._count.items,
      key: `tag-${index}`,
    }
  })
}

export default getTagsForCloud
