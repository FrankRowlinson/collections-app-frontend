import { t } from '@lingui/macro'
import moment from 'moment'

export function generateColumns() {
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: '100px',
      headerCheckboxSelection: true,
      checkboxSelection: true,
      showDisabledCheckboxes: false,
    },
    {
      field: 'username',
      headerName: t`Username`,
    },
    {
      field: 'role',
      headerName: t`Role`,
    },
    {
      field: 'createdAt',
      headerName: t`Registration date`,
    },
    {
      field: 'email',
      headerName: t`email`,
    },
    {
      field: 'hasAccess',
      headerName: t`Status`,
    },
  ]
  return columns
}

export function generateRows(users) {
  const rows = []
  users.forEach((user) => {
    const row = {
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
      createdAt: moment(user.createdAt).format('L'),
      hasAccess: user.hasAccess ? t`Active` : t`Blocked`,
    }
    rows.push(row)
  })
  return rows
}
