import axios from 'axios'

function formatCustomFields(customFields) {
  const result = {
    STRING: [],
    TEXT: [],
    DATE: [],
    NUMBER: [],
    BOOLEAN: [],
  }
  Object.keys(customFields).forEach((el) => {
    result[customFields[el].type].push({
      fieldName: el,
      value: customFields[el].value,
    })
  })

  return result
}

export async function sendItem(data, collectionId) {
  const { itemName, itemImage, tags, ...customFields } = data
  const formattedData = {
    itemName,
    itemImage,
    tags,
    collectionId,
    formattedFields: formatCustomFields(customFields),
  }
  const formData = new FormData()
  formattedData['itemImage'] &&
    formData.append('img', formattedData['itemImage'][0])
  formData.append('data', JSON.stringify(formattedData))
  const res = await axios.post(`${process.env.REACT_APP_HOST}items`, formData)
  return res
}
