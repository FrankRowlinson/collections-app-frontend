import axios from 'axios'
import { customFieldTypes } from '../constants/customFieldTypes'

export async function getCollectionFormProps() {
  const response = await axios.get('collections/props')
  response.data.fieldTypes = response.data.fieldTypes.map((el) => ({
    label: customFieldTypes[el].label,
    value: el,
  }))
  return response.data
}
