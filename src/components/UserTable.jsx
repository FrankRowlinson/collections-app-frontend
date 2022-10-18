import { useRef, useEffect, useState, useCallback } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css'
import { Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { generateColumns, generateRows } from '../services/generateUserGrid'

function UserTable({ users }) {
  const theme = useTheme()
  const gridRef = useRef()
  const [rowData, setRowData] = useState([])
  const [columnDefs, setColumnDefs] = useState([])

  useEffect(() => {
    setRowData(generateRows(users || []))
    setColumnDefs(generateColumns())
  }, [users])

  const defaultColDef = {
    resizable: true,
    sortable: true,
    cellStyle: {
      paddingTop: '0.6rem',
    },
  }

  const onFirstDataRendered = useCallback((params) => {
    gridRef.current.api.sizeColumnsToFit()
  }, [])

  const gridTheme =
    'ag-theme-alpine' + (theme.palette.mode === 'dark' ? '-dark' : '')
  return (
    <Box className={gridTheme} sx={{ width: '100%' }}>
      <AgGridReact
        defaultColDef={defaultColDef}
        rowData={rowData}
        columnDefs={columnDefs}
        domLayout="autoHeight"
        rowSelection="multiple"
        ref={gridRef}
        onFirstDataRendered={onFirstDataRendered}
      />
    </Box>
  )
}

export default UserTable
