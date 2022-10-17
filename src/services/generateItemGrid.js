import moment from 'moment'
import { Chip } from '@mui/material'

const TagsRenderer = (params) => {
  return (
    <>
      {params.data.tags &&
        params.data.tags.map((el) => {
          return <Chip key={el.id} size="small" variant="outlined" label={el.name} />
        })}
    </>
  )
}

export function generateColumns(item) {
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: '100px',
      headerCheckboxSelection: true,
      checkboxSelection: true,
      showDisabledCheckboxes: false,
    },
    { field: 'Item name' },
    { field: 'Created At' },
    {
      field: 'Tags',
      cellRenderer: TagsRenderer,
      wrapText: true,
      autoHeight: true,
      width: 350,
      sortable: false,
    },
  ]
  if (item) {
    item.fields.dateFields.length &&
      item.fields.dateFields.forEach((el) =>
        columns.push({ field: el.fieldName })
      )
    item.fields.stringFields.length &&
      item.fields.stringFields.forEach((el) =>
        columns.push({ field: el.fieldName })
      )
      return columns
  }
  return []
}

export function generateRows(items) {
  const rows = []
  items.forEach((el) => {
    const row = {
      id: el.id,
      'Created At': moment(el.createdAt).format('LLL'),
      'Item name': el.name,
      tags: el.tags,
    }
    el.fields.dateFields.length &&
      el.fields.dateFields.forEach(
        (el) => (row[[el.fieldName]] = moment(el.value).format('L'))
      )
    el.fields.stringFields.length &&
      el.fields.stringFields.forEach((el) => (row[[el.fieldName]] = el.value))
    rows.push(row)
  })
  return rows
}
