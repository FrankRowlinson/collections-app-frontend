import { Box } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context'
import { getUsers } from '../../services/userAPI'
import { Loader } from '../../shared'
import { UserTable, Warning } from './components'
import { useQuery } from 'react-query'

export function AdminPage() {
  const { user } = useContext(UserContext)
  const [hasAccess, setHasAccess] = useState<boolean>(false)
  const { data, isLoading } = useQuery(['adminPageUsers'], getUsers)

  useEffect(() => {
    user?.role === 'ADMIN' ? setHasAccess(true) : setHasAccess(false)
  }, [user])

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
          {hasAccess ? <UserTable users={data.users} /> : <Warning />}
        </Box>
      )}
    </>
  )
}
