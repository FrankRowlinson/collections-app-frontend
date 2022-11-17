import moment from 'moment'
import { t } from '@lingui/macro'
import { NameRenderer, TagRenderer } from '../renderers'

const defaultColumns: ColumnDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: '100px',
    headerCheckboxSelection: true,
    checkboxSelection: true,
    showDisabledCheckboxes: false,
  },
  {
    field: 'Item name',
    headerName: t`Item name`,
    cellRenderer: NameRenderer,
  },
  { field: 'Created At', headerName: t`Created At` },
  {
    field: 'Tags',
    headerName: t`Tags`,
    cellRenderer: TagRenderer,
    wrapText: true,
    autoHeight: true,
    width: 350,
    sortable: false,
    cellStyle: {
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      paddingTop: '5px',
      paddingBottom: '5px',
      paddingLeft: '5px',
      paddingRight: '5px',
    },
  },
]

export function generateColumns(item: ItemInfo) {
  if (!item) {
    return []
  }
  const columns = defaultColumns
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

export function generateRows(items: ItemInfo[]) {
  const rows: ItemRecord[] = []
  items.forEach((el) => {
    const row: ItemRecord = {
      id: el.id,
      'Created At': moment(el.createdAt).format('LLL'),
      'Item name': el.name,
      tags: el.tags,
    }
    el.fields.dateFields.length &&
      el.fields.dateFields.forEach(
        (el: ItemField) => (row[el.fieldName] = moment(el.value).format('L'))
      )
    el.fields.stringFields.length &&
      el.fields.stringFields.forEach((el) => (row[el.fieldName] = el.value))
    rows.push(row)
  })
  return rows
}
