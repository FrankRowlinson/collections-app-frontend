import React from 'react'
import { useState, useEffect } from 'react'
import {
  Container,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from '@mui/material'
import {
  getRecentItems,
  getBiggestCollections,
  getTags,
} from '../../services/homePageServices'
import { TagCloud } from 'react-tagcloud'
import TagRenderer from './TagRenderer'
import moment from 'moment'

const cardBackground =
  'linear-gradient(to top, rgba(0,0,0,1) 0%, ' +
  'rgba(0,0,0,0.3) 60%, rgba(0,0,0,0) 100%)'

function Home() {
  const [biggestCollections, setBiggestCollections] = useState(null)
  const [recentItems, setRecentItems] = useState(null)
  const [tags, setTags] = useState(null)

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
      const data = await getTags()
      setTags(data)
    }
    fetchData()
  }, [])

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6}>
          <Box
            sx={{
              alignItems: 'stretch',
              width: '100%',
            }}
          >
            <Grid container spacing={0.5} sx={{ position: 'sticky', top: 20 }}>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Biggest collections
                </Typography>
              </Grid>
              {biggestCollections
                ? biggestCollections.map((item, index) => {
                    const xs = {
                      0: 12,
                      1: 12,
                      2: 12,
                      3: 12,
                      4: 12,
                    }

                    const sm = {
                      0: 12,
                      2: 6,
                      1: 6,
                      3: 6,
                      4: 6,
                    }

                    const md = {
                      0: 6,
                      1: 6,
                      2: 4,
                      3: 4,
                      4: 4,
                    }

                    const lg = {
                      0: 12,
                      2: 6,
                      1: 6,
                      3: 6,
                      4: 6,
                    }

                    return (
                      <Grid
                        key={`biggest-collections-${index}`}
                        item
                        xs={xs[index]}
                        sm={sm[index]}
                        md={md[index]}
                        lg={lg[index]}
                        sx={{ display: 'flex' }}
                      >
                        <CardActionArea>
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
                                  sm: (250 * sm[index]) / 6,
                                  md: (300 * md[index]) / 6,
                                  lg: (400 * lg[index]) / 12,
                                },
                              }}
                              image={
                                item.img ||
                                'https://via.placeholder.com/300?text=No+image'
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
                                {item._count.items} item(s)
                              </Typography>
                            </CardContent>
                          </Card>
                        </CardActionArea>
                      </Grid>
                    )
                  })
                : ''}
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
            <Grid container spacing={1} sx={{ position: 'sticky', top: 20 }}>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Recent items
                </Typography>
              </Grid>
              {recentItems
                ? recentItems.map((item, index) => {
                    return (
                      <Grid
                        item
                        xs={6}
                        sm={4}
                        md={3}
                        sx={{ display: 'flex' }}
                        key={`recent-item-${index}`}
                      >
                        <CardActionArea>
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
                                'https://via.placeholder.com/300?text=No+image'
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
                : ''}
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12}>
          {tags && (
            <TagCloud
              tags={tags}
              minSize={10}
              maxSize={20}
              renderer={TagRenderer}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home
