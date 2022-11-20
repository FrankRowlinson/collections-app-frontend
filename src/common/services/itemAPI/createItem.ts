import axios from 'axios'

interface Result {
  STRING: FormattedField[]
  TEXT: FormattedField[]
  DATE: FormattedField[]
  NUMBER: FormattedField[]
  BOOLEAN: FormattedField[]
}

interface CustomField {
  label: string
  type: keyof Result
  value: any
}

interface CustomFields {
  [key: string]: CustomField
}

interface FormattedField {
  fieldName: string
  value: string
}

interface ItemFormData {
  itemName: string
  itemImage: File[]
  tags: string[]
  [key: string]: any
}

function formatCustomFields(customFields: CustomFields) {
  const result: Result = {
    STRING: [],
    TEXT: [],
    DATE: [],
    NUMBER: [],
    BOOLEAN: [],
  }
  Object.keys(customFields).forEach((field: string) => {
    const formattedField: FormattedField = {
      fieldName: customFields[field].label,
      value: customFields[field].value,
    }
    result[customFields[field].type].push(formattedField)
  })
  return result
}

export async function createItem(data: ItemFormData, collectionId: string) {
  const { itemName, itemImage, tags, ...customFields } = data
  const formattedData = {
    itemName,
    itemImage,
    tags,
    collectionId,
    formattedFields: formatCustomFields(customFields),
  }
  const formData: FormData = new FormData()
  formattedData['itemImage'] &&
    formData.append('img', formattedData['itemImage'][0])
  formData.append('data', JSON.stringify(formattedData))
  const response = await axios.post('items', formData)
  return response.data
}
