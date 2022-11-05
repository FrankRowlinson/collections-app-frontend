import { t, Trans } from '@lingui/macro'
import {
  Backdrop,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@mui/material'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TagCloud } from 'react-tagcloud'
import { routes } from '../../constants'
import { getBiggestCollections } from '../../services/collectionAPI'
import { getRecentItems } from '../../services/itemAPI'
import { getTagsForCloud } from '../../services/tagAPI'
import {
  CollectionsSkeleton,
  RecentItemsSkeleton,
  TagRenderer,
} from './components'

const cardBackground =
  'linear-gradient(to top, rgba(0,0,0,1) 0%, ' +
  'rgba(0,0,0,0.3) 60%, rgba(0,0,0,0) 100%)'

function Home() {
  const navigate = useNavigate()
  const [biggestCollections, setBiggestCollections] = useState(null)
  const [recentItems, setRecentItems] = useState(null)
  const [tags, setTags] = useState(null)
  const [inProgress, setInProgress] = useState(false)

  // load biggest collections
  useEffect(() => {
    const fetchData = async () => {
      const data = await getBiggestCollections()
      setBiggestCollections(data.collections)
    }
    fetchData()
  }, [])

  // load recently uploaded items
  useEffect(() => {
    const fetchData = async () => {
      const data = await getRecentItems()
      setRecentItems(data.items)
    }
    fetchData()
  }, [])

  // load tags for tag cloud
  useEffect(() => {
    const fetchData = async () => {
      const data = await getTagsForCloud()
      setTags(data.map((el) => ({ ...el, setInProgress: setInProgress })))
    }
    fetchData()
  }, [])

  return (
    <Container maxWidth="xl">
      <Backdrop sx={{ color: '#fff', zIndex: 2 }} open={inProgress}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <Box
            sx={{
              alignItems: 'stretch',
              width: '100%',
            }}
          >
            <Grid container spacing={0.5} sx={{ position: 'sticky', top: 0 }}>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  <Trans>Biggest collections</Trans>
                </Typography>
              </Grid>
              {biggestCollections ? (
                biggestCollections.map((item, index) => {
                  return (
                    <Grid
                      key={item.id}
                      item
                      xs={12}
                      sm={index ? 6 : 12}
                      md={index === 1 || index === 0 ? 6 : 4}
                      lg={index ? 6 : 12}
                      sx={{ display: 'flex' }}
                    >
                      <CardActionArea
                        onClick={() => {
                          navigate(`${routes.COLLECTIONS}/byid/${item.id}`)
                        }}
                      >
                        <Card
                          sx={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '0',
                            position: 'relative',
                          }}
                        >
                          <CardMedia
                            sx={{
                              height: {
                                xs: 300,
                                sm: index ? 250 : 500,
                                md: index === 1 || index === 0 ? 300 : 200,
                                lg: index ? 200 : 400,
                              },
                            }}
                            image={
                              item.img ||
                              `https://via.placeholder.com/300?text=${t`No+image`}`
                            }
                            component="img"
                          />
                          <CardContent
                            sx={{
                              position: 'absolute',
                              bottom: 0,
                              width: '100%',
                              background: cardBackground,
                            }}
                          >
                            <Typography
                              variant="overline"
                              color="#fff"
                              sx={{
                                fontWeight: 500,
                                fontSize: 14,
                                lineHeight: 1.5,
                              }}
                            >
                              {item.name}
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              color="#fff"
                              sx={{ fontSize: 13, fontWeight: 300 }}
                              textAlign="end"
                            >
                              <Trans>{item._count.items} item(s)</Trans>
                            </Typography>
                          </CardContent>
                        </Card>
                      </CardActionArea>
                    </Grid>
                  )
                })
              ) : (
                <CollectionsSkeleton />
              )}
            </Grid>
          </Box>
        </Grid>
        <Grid item container xs={12} lg={6}>
          <Box
            sx={{
              alignItems: 'stretch',
              width: '100%',
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 0.5 }}>
                  <Trans>Recent items</Trans>
                </Typography>
              </Grid>
              {recentItems ? (
                recentItems.map((item) => {
                  return (
                    <Grid
                      item
                      xs={6}
                      sm={4}
                      md={3}
                      sx={{ display: 'flex' }}
                      key={item.id}
                    >
                      <CardActionArea
                        onClick={() => {
                          navigate(`${routes.ITEMS}/byid/${item.id}`)
                        }}
                      >
                        <Card
                          sx={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 0,
                            position: 'relative',
                          }}
                        >
                          <CardMedia
                            sx={{
                              height: {
                                xs: 200,
                                sm: 200,
                                md: 175,
                                lg: 125,
                              },
                            }}
                            image={
                              item.img ||
                              `https://via.placeholder.com/300?text=${t`No+image`}`
                            }
                            component="img"
                          />
                          <CardContent
                            sx={{
                              position: 'absolute',
                              bottom: -20,
                              background: cardBackground,
                              width: '100%',
                              px: 1,
                            }}
                          >
                            <Typography
                              variant="overline"
                              color="#fff"
                              sx={{ fontWeight: 500, lineHeight: 0.5 }}
                            >
                              {item.name}
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              color="rgba(255, 255, 255, 0.7)"
                              sx={{ fontWeight: 400 }}
                            >
                              {moment(item.createdAt).fromNow()}
                            </Typography>
                          </CardContent>
                        </Card>
                      </CardActionArea>
                    </Grid>
                  )
                })
              ) : (
                <RecentItemsSkeleton />
              )}
              <Grid item container xs={12}>
                <Grid item xs={12}>
                  <Typography variant="h6">
                    <Trans>Popular tags</Trans>
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={{ overflow: 'auto', mt: 1 }}>
                  {tags && (
                    <TagCloud
                      tags={tags}
                      minSize={1}
                      maxSize={4}
                      renderer={TagRenderer}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home
