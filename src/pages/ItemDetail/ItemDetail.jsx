import { useState, useEffect, useContext } from 'react'
import {
  Container,
  Grid,
  Paper,
  Typography,
  Divider,
  Box,
  Chip,
  Button,
} from '@mui/material'
import Image from 'mui-image'
import Details from '../../components/Details'
import CommentSection from '../../components/CommentSection'
import { useParams, Link } from 'react-router-dom'
import getItem from '../../services/getItem'
import Loader from '../Loader/Loader'
import routes from '../../constants/routes'
import moment from 'moment'
import LikeCommentButtonGroup from '../../components/LikeCommentButtonGroup'
import { UserContext } from '../../context/UserContext'

function ItemDetail() {
  const { user } = useContext(UserContext)
  const [item, setItem] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      const data = await getItem(id)
      console.log(data.item)
      setItem(data.item)
      setIsLoading(false)
    }
    fetchData()
  }, [id])

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Container sx={{ mt: '20px', minHeight: '90vh' }}>
          <Grid container spacing={3}>
            {item.img && (
              <Grid item xs={12} md={4}>
                <Button
                  onClick={() => {
                    console.log(item)
                  }}
                >
                  123
                </Button>
                <Box sx={{ position: 'sticky', top: 20 }}>
                  <Image
                    src={item.img}
                    duration={1000}
                    easing="cubic-bezier(0.7, 0, 0.6, 1)"
                    showLoading={false}
                    errorIcon={true}
                    bgColor="inherit"
                  />
                  <Box
                    sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}
                  >
                    <LikeCommentButtonGroup
                      commentsCount={item.comments.length}
                      likes={item.likes}
                      beenLiked={
                        item.likes.filter((e) => e.userId === user.id).length >
                        0
                      }
                      itemId={item.id}
                    />
                  </Box>
                  <Divider sx={{mt: 1}}/>
                </Box>
              </Grid>
            )}
            <Grid item xs={12} md={item.img ? 8 : 12}>
              <Paper sx={{ p: 2 }}>
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
                      to={`${routes.USER_PROFILE}/${item.authorId}`}
                      sx={{
                        textDecoration: 'none',
                        color: 'text.primary',
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      by {item.author.username}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{ color: 'text.secondary' }}
                    >
                      {moment(item.createdAt).format('LL')}
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  sx={{ fontWeight: 500 }}
                  variant="h5"
                  textAlign="center"
                >
                  {item.name}
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
                  to={`${routes.COLLECTIONS}/byid/${item.collectionId}`}
                >
                  {item.partOf.type.name} | {item.partOf.name}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <Details fields={item.fields} />
                {/* tags */}
                {item.tags?.length ? (
                  <>
                    <Divider sx={{ my: 2 }} />
                    {item.tags.map((el, index) => {
                      return <Chip label={el.name} sx={{ mx: '3px' }} />
                    })}
                  </>
                ) : (
                  ''
                )}
                {!item.img && (
                  <>
                    <Divider sx={{ my: 1 }} />
                    <LikeCommentButtonGroup />
                  </>
                )}
              </Paper>
            </Grid>
          </Grid>
          {/* Comment Section */}
          <Box sx={{ minHeight: '100vh' }}></Box>
          <CommentSection comments={item.comments} />
        </Container>
      )}
    </>
  )
}

export default ItemDetail
