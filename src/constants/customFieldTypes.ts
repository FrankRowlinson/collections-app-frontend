import { t } from '@lingui/macro'

type FieldTypes = {
  [key: string]: {
    label: string
    type: string
  }
}

export const customFieldTypes: FieldTypes = {
  STRING: { label: t`Short text`, type: 'text' },
  NUMBER: { label: t`Number`, type: 'number' },
  TEXT: { label: t`Text`, type: 'textarea' },
  BOOLEAN: { label: t`Yes / No`, type: 'checkbox' },
  DATE: { label: t`Date`, type: 'date' },
}
