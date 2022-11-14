import { useState, useContext } from 'react'
import {
  Container,
  Grid,
  Paper,
  Typography,
  Divider,
  Box,
  Backdrop,
  CircularProgress,
} from '@mui/material'
import { Details, CommentSection, LikeButton, ItemImage } from './components'
import { useParams, Link } from 'react-router-dom'
import { getItem } from '../../services/itemAPI'
import { Loader, Tag } from '../../shared'
import { routes } from '../../constants'
import moment from 'moment'
import { UserContext, ItemContext } from '../../context'
import { Trans } from '@lingui/macro'
import { useQuery } from 'react-query'

function ItemDetail() {
  const { id } = useParams()
  const { user } = useContext(UserContext)
  const { data, isLoading } = useQuery([id], getItem(id))
  const [inProgress, setInProgress] = useState(false)

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <ItemContext.Provider value={{ itemId: data.item.id }}>
          <Backdrop sx={{ color: '#fff', zIndex: 2 }} open={inProgress}>
            <CircularProgress color="inherit" />
          </Backdrop>
          <Container sx={{ mt: '20px' }}>
            <Grid container spacing={2}>
              {data.item.img && (
                <Grid item xs={12} md={4}>
                  <Box sx={{ position: 'sticky', top: 20 }}>
                    <ItemImage img={data.item.img} />
                    <Box
                      sx={{ display: 'flex', justifyContent: 'center', my: 1 }}
                    >
                      <LikeButton
                        likes={data.item.likes}
                        beenLiked={
                          data.item.likes.filter((e) => e.userId === user.id)
                            .length > 0
                        }
                        itemId={data.item.id}
                      />
                    </Box>
                  </Box>
                </Grid>
              )}
              <Grid item xs={12} md={data.item.img ? 8 : 12}>
                <Paper sx={{ p: 2, position: 'sticky', top: 20 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                  >
                    <Box>
                      <Typography
                        variant="subtitle1"
                        component={Link}
                        to={`${routes.USER_PROFILE}/${data.item.authorId}`}
                        sx={{
                          textDecoration: 'none',
                          color: 'text.primary',
                          '&:hover': {
                            textDecoration: 'underline',
                          },
                        }}
                      >
                        <Trans>by {data.item.author.username}</Trans>
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{ color: 'text.secondary' }}
                      >
                        {moment(data.item.createdAt).format('LL')}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography
                    sx={{ fontWeight: 500 }}
                    variant="h5"
                    textAlign="center"
                  >
                    {data.item.name}
                  </Typography>
                  <Typography
                    variant="overline"
                    textAlign="center"
                    sx={{
                      display: 'block',
                      textDecoration: 'none',
                      color: 'text.primary',
                      '&:hover': { textDecoration: 'underline' },
                    }}
                    component={Link}
                    to={`${routes.COLLECTIONS}/byid/${data.item.collectionId}`}
                  >
                    {data.item.partOf.type.name} | {data.item.partOf.name}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Details fields={data.item.fields} />
                  {/* tags */}
                  {data.item.tags?.length ? (
                    <Box sx={{ py: 2 }}>
                      {data.item.tags.map((el) => {
                        return (
                          <Tag
                            name={el.name}
                            setInProgress={setInProgress}
                            key={el.id}
                          />
                        )
                      })}
                    </Box>
                  ) : (
                    ''
                  )}
                  {!data.item.img && (
                    <>
                      <LikeButton
                        likes={data.item.likes}
                        beenLiked={
                          data.item.likes.filter((e) => e.userId === user.id)
                            .length > 0
                        }
                        itemId={data.item.id}
                      />
                    </>
                  )}
                </Paper>
              </Grid>
            </Grid>
            <CommentSection comments={data.item.comments} />
          </Container>
        </ItemContext.Provider>
      )}
    </>
  )
}

export default ItemDetail
