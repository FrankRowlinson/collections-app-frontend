import { useRef, useEffect, useState, useCallback, useContext } from 'react'
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
import { UserContext } from '../context/UserContext'
import {
  changeUsersRole,
  blockUsers,
  unblockUsers,
  deleteUsers,
} from '../services/adminActions'
import { t, Trans } from '@lingui/macro'

function UserTable({ users }) {
  const { handleLogout } = useContext(UserContext)
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

  // setup for user grid
  useEffect(() => {
    setColumnDefs(generateColumns())
  }, [])

  useEffect(() => {
    setRowData(generateRows(users || []))
  }, [users])

  const resetSelection = useCallback(() => {
    setSelectedRows([])
    gridRef.current.api.deselectAll()
  }, [])

  // update data based on action taken
  const onRoleChange = (ids, role) => {
    setRowData(
      rowData.map((el) => {
        return {
          ...el,
          role: ids.includes(el.id) ? role : el.role,
        }
      })
    )
  }

  const onBlock = (ids) => {
    setRowData(
      rowData.map((el) => {
        return {
          ...el,
          hasAccess: ids.includes(el.id) ? t`Blocked` : el.hasAccess,
        }
      })
    )
  }
  const onUnblock = (ids) => {
    setRowData(
      rowData.map((el) => {
        return {
          ...el,
          hasAccess: ids.includes(el.id) ? t`Active` : el.hasAccess,
        }
      })
    )
  }
  const onDelete = (ids) => {
    setRowData(rowData.filter((el) => !ids.includes(el.id)))
  }

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
      description: t`You want to change role of ${selectedRows.length} selected user(s) to ${role}. Proceed?`,
      confirmationText: t`Change`,
      confirmationButtonProps: { variant: 'contained', color: 'primary' },
    })
      .then(async () => {
        const ids = selectedRows.map((el) => el.id)
        const response = await changeUsersRole(ids, role)
        if (response.triggerLogout) {
          await handleLogout()
        }
        if (response.result.count > 0) onRoleChange(ids, role)
        resetSelection()
      })
      .catch(() => {})
  }
  const handleBlock = async () => {
    confirm({
      description: t`Do you want to block ${selectedRows.length} selected user(s)?`,
      confirmationText: t`Block`,
      confirmationButtonProps: { variant: 'contained', color: 'warning' },
    })
      .then(async () => {
        const ids = selectedRows.map((el) => el.id)
        const response = await blockUsers(ids)
        if (response.triggerLogout) {
          await handleLogout()
        }
        if (response.result.count > 0) onBlock(ids)
        resetSelection()
      })
      .catch(() => {})
  }
  const handleUnblock = async () => {
    confirm({
      description: t`Do you want to unblock ${selectedRows.length} selected user(s)?`,
      confirmationText: t`Unblock`,
      confirmationButtonProps: { variant: 'contained', color: 'success' },
    })
      .then(async () => {
        const ids = selectedRows.map((el) => el.id)
        const response = await unblockUsers(ids)
        if (response.triggerLogout) {
          await handleLogout()
        }
        if (response.result.count > 0) onUnblock(ids)
        resetSelection()
      })
      .catch(() => {})
  }
  const handleDelete = async () => {
    confirm({
      description: t`Do you want to delete ${selectedRows.length} selected user(s)? This action is irreversible!`,
      confirmationText: t`Delete`,
      confirmationButtonProps: { variant: 'contained', color: 'error' },
    })
      .then(async () => {
        const ids = selectedRows.map((el) => el.id)
        const response = await deleteUsers(ids)
        if (response.triggerLogout) {
          await handleLogout()
        }
        if (response.result.count > 0) onDelete(ids)
        resetSelection()
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
          <Trans>Change role</Trans>
        </Button>
        <Button
          type="submit"
          startIcon={<TbLock />}
          variant="contained"
          color="warning"
          onClick={handleBlock}
          disabled={disabled}
        >
          <Trans>Block</Trans>
        </Button>
        <Button
          startIcon={<TbLockOpen />}
          variant="contained"
          color="success"
          type="submit"
          onClick={handleUnblock}
          disabled={disabled}
        >
          <Trans>Unblock</Trans>
        </Button>
        <Button
          startIcon={<MdDeleteForever />}
          variant="contained"
          color="error"
          type="submit"
          onClick={handleDelete}
          disabled={disabled}
        >
          <Trans>Delete</Trans>
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
              <Trans>To: {el}</Trans>
            </MenuItem>
          )
        })}
      </Menu>
    </Box>
  )
}

export default UserTable
