import React, { useEffect, useRef, useState, useCallback } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css'
import { generateColumns, generateRows } from '../services/generateItemGrid'
import { useTheme } from '@mui/material/styles'
import {
  Box,
  ButtonGroup,
  Button,
  Backdrop,
  CircularProgress,
} from '@mui/material'
import routes from '../constants/routes'
import { useNavigate } from 'react-router-dom'
import { getItemsById } from '../services/getItemsById'
import { deleteItemsById } from '../services/deleteItemsById'

function ItemTable({ items, rightToEdit }) {
  const theme = useTheme()
  const gridRef = useRef()

  const navigate = useNavigate()

  const [selectedRows, setSelectedRows] = useState([])
  const [inProgress, setInProgress] = useState(false)

  const onSelectionChanged = useCallback(() => {
    setSelectedRows(gridRef.current.api.getSelectedRows())
  }, [])

  const handleRowDeletion = async () => {
    await deleteItemsById(selectedRows.map((el) => el.id))
  }

  const handleRowShow = async () => {
    setInProgress(true)
    const response = await getItemsById(selectedRows.map((el) => el.id))
    navigate(routes.SEARCH_RESULTS, {
      state: { query: null, items: response.items },
    })
  }

  const disabled = selectedRows.length === 0

  const defaultColDef = {
    resizable: true,
    sortable: true,
    cellStyle: {
      paddingTop: '0.6rem',
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

  const onFirstDataRendered = useCallback((params) => {
    gridRef.current.api.sizeColumnsToFit()
  }, [])

  return (
    <Box sx={{ width: '100%', mb: 4 }} className={gridTheme}>
      <Backdrop sx={{ color: '#fff', zIndex: 2 }} open={inProgress}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <ButtonGroup>
        <Button
          disabled={disabled}
          variant="contained"
          color="warning"
          onClick={handleRowShow}
        >
          Show in new tab
        </Button>
        {rightToEdit && (
          <Button
            disabled={disabled}
            variant="contained"
            color="error"
            onClick={handleRowDeletion}
          >
            Delete items
          </Button>
        )}
      </ButtonGroup>
      <AgGridReact
        domLayout="autoHeight"
        defaultColDef={defaultColDef}
        rowSelection="multiple"
        onSelectionChanged={onSelectionChanged}
        columnDefs={columnDefs}
        rowData={rowData}
        ref={gridRef}
        onFirstDataRendered={onFirstDataRendered}
      />
    </Box>
  )
}

export default ItemTable
