import { Alert, Typography, Grid, Box } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import Loader from '../Loader/Loader'
import UserTable from '../../components/UserTable'
import { getUsers } from '../../services/getUsers'

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
      <Typography variant="h6">Access denied</Typography>
      <Typography variant="body1">
        Seems like you've logged in as user with no admin rights or visiting as
        guest.
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
          {hasAccess ? <UserTable users={users} /> : <Warning />}
        </Box>
      )}
    </>
  )
}

export default AdminPage
