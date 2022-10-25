import axios from 'axios'

export async function getRecentItems() {
  const response = await axios.get('items/recent')
  return response.data
}

export async function getTags() {
  const response = await axios.get('items/tagscloud')
  return transformTagsForCloud(response.data.tags)
}

export async function getBiggestCollections() {
  const response = await axios.get('collections/biggest')
  return response.data
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
