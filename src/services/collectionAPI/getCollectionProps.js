import axios from 'axios'
import { t } from '@lingui/macro'

const customFieldTypes = {
  STRING: { label: t`Short text`, type: 'text' },
  NUMBER: { label: t`Number`, type: 'number' },
  TEXT: { label: t`Text`, type: 'textarea' },
  BOOLEAN: { label: t`Yes / No`, type: 'checkbox' },
  DATE: { label: t`Date`, type: 'date' },
}

async function getCollectionProps() {
  const response = await axios.get('collections/props')
  response.data.fieldTypes = response.data.fieldTypes.map((el) => ({
    label: customFieldTypes[el].label,
    value: el,
  }))
  return response.data
}

export default getCollectionProps