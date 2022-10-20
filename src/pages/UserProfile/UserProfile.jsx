import React, { useContext, useEffect, useState } from 'react'
import {
  Typography,
  Grid,
  Container,
  Paper,
  Box,
  Stack,
  Divider,
} from '@mui/material'
import { Image } from 'mui-image'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { UserContext } from '../../context/UserContext'
import getUserProfileData from '../../services/getUserProfileData'
import Loader from '../Loader/Loader'

function UserProfile() {
  const { userId } = useParams()
  const { user } = useContext(UserContext)
  const [userData, setUserData] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      // either use id from parameters or id of a user that is logged in
      const authorId = userId ? userId : user.id
      const data = await getUserProfileData(authorId)
      console.log(data)
      setUserData(data)
      setIsLoading(false)
    }
    fetchData()
  }, [userId, user.id])

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Container
          component={Paper}
          elevation={2}
          maxWidth="lg"
          sx={{ minHeight: '100vh' }}
        >
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sx={{ display: 'flex', justifyContent: 'between' }}
            >
              <Typography variant="h4">{user.username}'s profile</Typography>
              <Box flexGrow={1}></Box>
              <Typography
                title={user.role.toLowerCase()}
                variant="h5"
                sx={{ cursor: 'help' }}
              >
                {user.role === 'USER' ? '👩🏻‍🦲' : '👮🏻‍♂️'}
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
            <Grid item container xs={12}>
              {userData.collections.map((el) => {
                return (
                  <Grid item xs={12}>
                    {el.name}
                  </Grid>
                )
              })}
            </Grid>
          </Grid>

          {/* {collections
  ? collections.map((el) => {
    return (
      <div key={el.id}>
      {el.id}
      <img src={el.img} alt="" />
      </div>
      )
    })
  : ''} */}
        </Container>
      )}
    </>
  )
}

export default UserProfile
