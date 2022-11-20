import { Container, Grid, Paper } from '@mui/material'
import { useParams } from 'react-router-dom'
import { getUserProfileData } from '../../common/services'
import { Loader } from '../../common/components'
import { UserInfo, UserCollections } from './components'
import { useQuery } from 'react-query'

interface RouterParams {
  id: string
}

export function UserProfile() {
  const { id } = useParams<keyof RouterParams>() as RouterParams
  const { data, isLoading } = useQuery([id], getUserProfileData(id))

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Container maxWidth="lg">
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
                <UserCollections authorId={id} />
              </Grid>
            </Grid>
          </Paper>
        </Container>
      )}
    </>
  )
}
