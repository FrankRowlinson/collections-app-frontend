import React, { useContext, useEffect, useState } from 'react'
import {
  Container,
  Grid,
  Box,
  Stack,
  Paper,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Typography,
  Divider,
} from '@mui/material'
import { Image } from 'mui-image'
import { useParams, useNavigate } from 'react-router-dom'
import moment from 'moment'
import { UserContext } from '../../context/UserContext'
import getUserProfileData from '../../services/getUserProfileData'
import Loader from '../Loader/Loader'
import routes from '../../constants/routes'

function UserProfile() {
  const { userId } = useParams()
  const { user } = useContext(UserContext)
  const [userData, setUserData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      // either use id from parameters or id of a user that is logged in
      const authorId = userId ? userId : user.id
      const data = await getUserProfileData(authorId)
      setUserData(data)
      setIsLoading(false)
    }
    fetchData()
  }, [user, userId])

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Container
          elevation={2}
          maxWidth="lg"
        >
          <Paper sx={{width: '100%', p: 2}}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sx={{ display: 'flex', justifyContent: 'between' }}
            >
              <Typography variant="h4">{userData.username}'s profile</Typography>
              <Box flexGrow={1}></Box>
              <Typography
                title={userData.role.toLowerCase()}
                variant="h5"
                sx={{ cursor: 'help' }}
              >
                {userData.role === 'USER' ? '👩🏻‍🦲' : '👮🏻‍♂️'}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Image src="https://via.placeholder.com/300?text=Avatar" />
            </Grid>
            <Grid item xs={12} sm={6} md={8} lg={9}>
              <Stack spacing={2}>
                <Typography variant="h5">Accomplishments</Typography>
                <Typography variant="body1">
                  <strong>Collections added:</strong>{' '}
                  {userData.collections.length}
                </Typography>
                <Typography variant="body1">
                  <strong>Total items in all collections:</strong>{' '}
                  {userData._count.items}
                </Typography>
                <Typography variant="body1">
                  <strong>Comments left:</strong> {userData._count.comments}
                </Typography>
                <Divider />
                <Typography variant="overline">
                  Registered for {moment(userData.createdAt).fromNow(true)}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5">Personal collections</Typography>
              <Divider />
            </Grid>
            <Grid item xs={12}></Grid>
            {/* Cards with collections */}
            <Grid
              item
              container
              xs={12}
              spacing={2}
              sx={{ mb: 3, alignItems: 'stretch' }}
            >
              {userData.collections.map((el, index) => {
                return (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    key={`collection-${index}`}
                    sx={{ display: 'flex' }}
                  >
                    <CardActionArea
                      onClick={() => {
                        navigate(`${routes.COLLECTIONS}/byid/${el.id}`)
                      }}
                    >
                      <Card sx={{ width: '100%', height: '100%' }}>
                        <CardMedia
                          component="img"
                          sx={{ height: { xs: 250, sm: 200, md: 150 } }}
                          image={
                            el.img ||
                            'https://via.placeholder.com/300?text=No+image'
                          }
                          alt=""
                        />
                        <CardContent>
                          <Typography variant="h5" component="div">
                            {el.name}
                          </Typography>
                          <Typography variant="overline" color="text.secondary">
                            {el.type.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {moment(el.createdAt).format('LL')}
                          </Typography>
                        </CardContent>
                      </Card>
                    </CardActionArea>
                  </Grid>
                )
              })}
            </Grid>
          </Grid>
          </Paper>
        </Container>
      )}
    </>
  )
}

export default UserProfile
