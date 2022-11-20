import axios from 'axios'

type CollectionEditFormData = {
  name: string
  description: string
}

export async function editCollection(id: string, data: CollectionEditFormData) {
  const response = await axios.patch('collections/edit', { id, ...data })
  return response.data
}
