import { t } from '@lingui/macro'

const customFieldTypes = {
  STRING: { label: t`Short text`, type: 'text' },
  NUMBER: { label: t`Number`, type: 'number' },
  TEXT: { label: t`Text`, type: 'textarea' },
  BOOLEAN: { label: t`Yes / No`, type: 'checkbox' },
  DATE: { label: t`Date`, type: 'date' },
}

export default customFieldTypes
