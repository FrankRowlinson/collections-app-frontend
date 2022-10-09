import axios from 'axios'
import { customFieldTypes } from '../constants/customFieldTypes'

async function getCollectionFormProps() {
  const response = await axios.get(
    `${process.env.REACT_APP_HOST}collections/props`
  )
  response.data.fieldTypes = response.data.fieldTypes.map((el) => ({
    label: customFieldTypes[el],
    value: el,
  }))
  return response.data
}

export default getCollectionFormProps
