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
  Button,
  Typography,
  Divider,
} from '@mui/material'
import { Image } from 'mui-image'
import { useParams, useNavigate } from 'react-router-dom'
import moment from 'moment'
import { UserContext } from '../../context/UserContext'
import {
  getUserProfileData,
  getUserCollections,
} from '../../services/getUserProfileData'
import Loader from '../Loader/Loader'
import routes from '../../constants/routes'
import { Trans, t } from '@lingui/macro'
import { useInfiniteQuery } from 'react-query'

function UserProfile() {
  const { userId } = useParams()
  const { user } = useContext(UserContext)
  const [userData, setUserData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery(
      ['userProfile'],
      getUserCollections(userId ? userId : user.id),
      {
        getNextPageParam: (lastPage) =>
          lastPage.collections.length < 8 ? undefined : lastPage.cursor,
      }
    )

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
        <Container elevation={2} maxWidth="lg">
          <Paper sx={{ width: '100%', p: 2 }}>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sx={{ display: 'flex', justifyContent: 'between' }}
              >
                <Typography variant="h5" sx={{ fontWeight: 500 }}>
                  <Trans>{userData.username}'s profile</Trans>
                </Typography>
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
                <Image
                  src={`https://via.placeholder.com/300?text=${t`Avatar`}`}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={8} lg={9}>
                <Stack spacing={2}>
                  <Typography variant="h6" sx={{ fontWeight: 500 }}>
                    <Trans>Accomplishments</Trans>
                  </Typography>
                  <Typography variant="body1">
                    <Trans>
                      <strong>Collections added:</strong>{' '}
                      {userData._count.collections}
                    </Trans>
                  </Typography>
                  <Typography variant="body1">
                    <Trans>
                      <strong>Total items in all collections:</strong>{' '}
                      {userData._count.items}
                    </Trans>
                  </Typography>
                  <Typography variant="body1">
                    <Trans>
                      <strong>Comments left:</strong> {userData._count.comments}
                    </Trans>
                  </Typography>
                  <Divider />
                  <Typography variant="overline">
                    <Trans>
                      Registered for {moment(userData.createdAt).fromNow(true)}
                    </Trans>
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  <Trans>Personal collections</Trans>
                </Typography>
                <Divider />
              </Grid>
              {/* Cards with collections */}
              <Grid
                item
                container
                xs={12}
                spacing={1}
                sx={{ alignItems: 'stretch' }}
              >
                {status === 'loading' ? (
                  <Loader />
                ) : (
                  <>
                    {data.pages.map((group, i) => (
                      <React.Fragment key={i}>
                        {group.collections.map((item, index) => (
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
                                navigate(
                                  `${routes.COLLECTIONS}/byid/${item.id}`
                                )
                              }}
                            >
                              <Card
                                sx={{
                                  width: '100%',
                                  height: '100%',
                                  borderRadius: 0,
                                }}
                              >
                                <CardMedia
                                  component="img"
                                  sx={{ height: { xs: 300, sm: 250, md: 200 } }}
                                  image={
                                    item.img ||
                                    `https://via.placeholder.com/300?text=${t`No+image`}`
                                  }
                                  alt=""
                                />
                                <CardContent>
                                  <Typography
                                    variant="body1"
                                    sx={{ fontWeight: 500 }}
                                    component="div"
                                  >
                                    {item.name}
                                  </Typography>
                                  <Typography
                                    variant="overline"
                                    color="text.secondary"
                                  >
                                    {item.type.name}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    {moment(item.createdAt).format('LL')}
                                  </Typography>
                                </CardContent>
                              </Card>
                            </CardActionArea>
                          </Grid>
                        ))}
                      </React.Fragment>
                    ))}
                    <Grid
                      item
                      xs={12}
                      sx={{ display: 'flex', justifyContent: 'center' }}
                    >
                      <Button
                        size="large"
                        variant="outlined"
                        color="inherit"
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        sx={{ display: !hasNextPage ? 'none' : 'block' }}
                      >
                        {isFetchingNextPage
                          ? 'Loading more...'
                          : hasNextPage
                          ? 'Load More'
                          : 'Nothing more to load'}
                      </Button>
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>
          </Paper>
        </Container>
      )}
    </>
  )
}

export default UserProfile
