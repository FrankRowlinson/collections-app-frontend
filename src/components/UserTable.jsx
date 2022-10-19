import { useRef, useEffect, useState, useCallback } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css'
import { Box, Button, ButtonGroup, Menu, MenuItem } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { MdDeleteForever } from 'react-icons/md'
import { TbLock, TbLockOpen } from 'react-icons/tb'
import { RiUserSettingsLine } from 'react-icons/ri'
import { generateColumns, generateRows } from '../services/generateUserGrid'
import { useConfirm } from 'material-ui-confirm'
import roles from '../constants/roles'
import {
  changeUsersRole,
  blockUsers,
  unblockUsers,
  deleteUsers,
} from '../services/adminActions'

function UserTable({ users }) {
  const theme = useTheme()
  const confirm = useConfirm()
  const gridRef = useRef()
  const [rowData, setRowData] = useState([])
  const [columnDefs, setColumnDefs] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [anchorForRoleSelection, setAnchorForRoleSelection] = useState(null)

  // role selection menu
  const open = Boolean(anchorForRoleSelection)
  const handleClick = (event) => {
    setAnchorForRoleSelection(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorForRoleSelection(null)
  }

  // setup for user grip
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

  const onSelectionChanged = useCallback(() => {
    setSelectedRows(gridRef.current.api.getSelectedRows())
  }, [])

  const onFirstDataRendered = useCallback((params) => {
    gridRef.current.api.sizeColumnsToFit()
  }, [])

  const disabled = selectedRows.length === 0

  // handlers for actions
  const handleRoleChange = async (role) => {
    confirm({
      description: `You want to change role of ${selectedRows.length} selected user(s) to ${role}. Proceed?`,
      confirmationText: 'Change',
      confirmationButtonProps: { variant: 'contained', color: 'primary' },
    })
      .then(async () => {
        await changeUsersRole(
          selectedRows.map((el) => el.id),
          role
        )
      })
      .catch(() => {})
  }
  const handleBlock = async () => {
    confirm({
      description: `Do you want to block ${selectedRows.length} selected user(s)?`,
      confirmationText: 'Block',
      confirmationButtonProps: { variant: 'contained', color: 'warning' },
    })
      .then(async () => {
        await blockUsers(selectedRows.map((el) => el.id))
      })
      .catch(() => {})
  }
  const handleUnblock = async () => {
    confirm({
      description: `Do you want to unblock ${selectedRows.length} selected user(s)?`,
      confirmationText: 'Unblock',
      confirmationButtonProps: { variant: 'contained', color: 'success' },
    })
      .then(async () => {
        await unblockUsers(selectedRows.map((el) => el.id))
      })
      .catch(() => {})
  }
  const handleDelete = async () => {
    confirm({
      description: `Do you want to delete ${selectedRows.length} selected user(s)? This action is irreversible!`,
      confirmationText: 'Delete',
      confirmationButtonProps: { variant: 'contained', color: 'error' },
    })
      .then(async () => {
        await deleteUsers(selectedRows.map((el) => el.id))
      })
      .catch(() => {})
  }

  const gridTheme =
    'ag-theme-alpine' + (theme.palette.mode === 'dark' ? '-dark' : '')

  return (
    <Box maxWidth="lg" className={gridTheme} sx={{ width: '100%' }}>
      <ButtonGroup>
        <Button
          startIcon={<RiUserSettingsLine />}
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleClick}
          disabled={disabled}
        >
          Change role
        </Button>
        <Button
        type="submit"
          startIcon={<TbLock />}
          variant="contained"
          color="warning"
          onClick={handleBlock}
          disabled={disabled}
        >
          Block
        </Button>
        <Button
          startIcon={<TbLockOpen />}
          variant="contained"
          color="success"
          type="submit"
          onClick={handleUnblock}
          disabled={disabled}
        >
          Unblock
        </Button>
        <Button
          startIcon={<MdDeleteForever />}
          variant="contained"
          color="error"
          type="submit"
          onClick={handleDelete}
          disabled={disabled}
        >
          Delete
        </Button>
      </ButtonGroup>
      <AgGridReact
        defaultColDef={defaultColDef}
        rowData={rowData}
        columnDefs={columnDefs}
        domLayout="autoHeight"
        rowSelection="multiple"
        ref={gridRef}
        onFirstDataRendered={onFirstDataRendered}
        onSelectionChanged={onSelectionChanged}
      />
      <Menu open={open} anchorEl={anchorForRoleSelection} onClose={handleClose}>
        {roles.map((el) => {
          return (
            <MenuItem
              key={el}
              onClick={() => {
                handleRoleChange(el)
                handleClose()
              }}
            >
              To: {el}
            </MenuItem>
          )
        })}
      </Menu>
    </Box>
  )
}

export default UserTable
