import { Container, Grid, Paper } from '@mui/material'
import { useParams } from 'react-router-dom'
import { getUserProfileData } from '../../services/userAPI'
import { Loader } from '../../shared'
import { UserInfo, UserCollections } from './components'
import { useQuery } from 'react-query'

function UserProfile() {
  const { userId } = useParams()
  const { data, isLoading } = useQuery([userId], getUserProfileData(userId))

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Container elevation={2} maxWidth="lg">
          <Paper sx={{ width: '100%', p: 2 }}>
            <Grid container spacing={2}>
              <UserInfo data={data} />
              <Grid
                item
                container
                xs={12}
                spacing={1}
                sx={{ alignItems: 'stretch' }}
              >
                <UserCollections authorId={userId} />
              </Grid>
            </Grid>
          </Paper>
        </Container>
      )}
    </>
  )
}

export default UserProfile
