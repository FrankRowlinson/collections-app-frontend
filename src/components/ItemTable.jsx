import React, { useEffect, useRef, useState, useCallback } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css'
import { generateColumns, generateRows } from '../services/generateItemGrid'
import { useTheme } from '@mui/material/styles'
import { Box, ButtonGroup, Button } from '@mui/material'

function ItemTable({ items }) {
  const theme = useTheme()
  const gridRef = useRef()

  const [selectedRows, setSelectedRows] = useState([])
  
  const onSelectionChanged = useCallback(() => {
    setSelectedRows(gridRef.current.api.getSelectedRows())
  }, [])
  
  const handleRowDeletion = () => {
    console.log(selectedRows)
  }

  const handleRowShow = () => {
    console.log(selectedRows)
  }

  const disabled = selectedRows.length === 0

  const defaultColDef = {
    resizable: true,
    sortable: true,
    cellStyle: {
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  }

  const gridTheme =
    'ag-theme-alpine' + (theme.palette.mode === 'dark' ? '-dark' : '')

  const [rowData, setRowData] = useState([])
  const [columnDefs, setColumnDefs] = useState([])
  useEffect(() => {
    if (items) {
      setColumnDefs(generateColumns(items[0]))
      setRowData(generateRows(items))
    }
  }, [items])

  return (
    <Box sx={{ height: '500px', width: '100%', mb: 4 }} className={gridTheme}>
      <ButtonGroup>
        <Button disabled={disabled} variant="contained" color="warning" onClick={handleRowShow}>Show in new tab</Button>
        <Button disabled={disabled} variant="contained" color="error" onClick={handleRowDeletion}>Delete items</Button>
      </ButtonGroup>
      <AgGridReact
        defaultColDef={defaultColDef}
        rowSelection="multiple"
        onSelectionChanged={onSelectionChanged}
        columnDefs={columnDefs}
        rowData={rowData}
        ref={gridRef}
      />
    </Box>
  )
}

export default ItemTable
