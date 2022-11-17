import axios from 'axios'

interface Tag {
  name: string
  _count: {
    items: number
  }
  id: string
}

export async function getTagsForCloud() {
  const response = await axios.get('tags/cloud')
  return transformTagsForCloud(response.data.tags)
}

const transformTagsForCloud = (tags: Tag[]) => {
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
