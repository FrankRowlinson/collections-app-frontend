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
      headerName: 'Username',
    },
    {
      field: 'role',
      headerName: 'Role',
    },
    {
      field: 'createdAt',
      headerName: 'Registration date',
    },
    {
      field: 'email',
    },
    {
      field: 'hasAccess',
      headerName: 'Status',
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
      hasAccess: user.hasAccess ? 'Active' : 'Blocked', 
    }
    rows.push(row)
  })
  return rows
}
