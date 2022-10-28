import { Alert, Typography, Box } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import Loader from '../Loader/Loader'
import UserTable from '../../components/UserTable'
import { getUsers } from '../../services/getUsers'
import { Trans } from '@lingui/macro'

function AdminPage() {
  const { user } = useContext(UserContext)
  const [hasAccess, setHasAccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState([])

  useEffect(() => {
    user.role === 'ADMIN' ? setHasAccess(true) : setHasAccess(false)
  }, [user])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUsers()
      setUsers(data.users)
    }
    fetchData()
  }, [hasAccess])

  useEffect(() => {
    setIsLoading(false)
  }, [hasAccess, users])

  const Warning = () => (
    <Alert color="error" variant="filled">
      <Typography variant="h6">
        <Trans>Access denied</Trans>
      </Typography>
      <Typography variant="body1">
        <Trans>
          Seems like you've logged in as user with no admin rights or visiting
          as guest.
        </Trans>
      </Typography>
    </Alert>
  )
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '70vh',
          }}
        >
          {hasAccess ? (
            <UserTable
              users={users}
              setUsers={setUsers}
              setHasAccess={setHasAccess}
            />
          ) : (
            <Warning />
          )}
        </Box>
      )}
    </>
  )
}

export default AdminPage
