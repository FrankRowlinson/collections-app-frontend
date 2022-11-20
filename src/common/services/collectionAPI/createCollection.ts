import axios from 'axios'

type CollectionFormData = {
  collectionName: string
  collectionType: string
  collectionDescription: string
  collectionCover?: File[]
  customFields?: any[]
}

export async function createCollection(data: CollectionFormData) {
  const formData = new FormData()
  if (data['collectionCover']) {
    formData.append('img', data['collectionCover'][0])
  }
  formData.append('data', JSON.stringify(data))
  const res = await axios.post('collections', formData)
  return res
}
