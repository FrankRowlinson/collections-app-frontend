import axios from 'axios'
import { customFieldTypes } from '../../constants'

export async function getCollectionProps() {
  const response = await axios.get('collections/props')
  response.data.fieldTypes = response.data.fieldTypes.map((field: string) => ({
    label: customFieldTypes[field].label,
    value: field,
  }))
  return response.data
}
