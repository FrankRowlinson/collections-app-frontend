import { useContext, useEffect, useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { getCollection } from '../../services/fetchCollections'
import { Container, Typography, Grid, Box, Divider, Paper } from '@mui/material'
import AddItemForm from './components/AddItemForm'
import ItemTable from './components/ItemTable'
import Loader from '../../shared/Loader'
import './CollectionDetail.css'
import { UserContext } from '../../context/UserContext'
import { useNavigate, Link } from 'react-router-dom'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import routes from '../../constants/routes'
import Image from 'mui-image'
import CollectionMenu from './components/CollectionMenu'
import { t, Trans } from '@lingui/macro'
import moment from 'moment'
import { CollectionContext } from '../../context/CollectionContext'
import { useQuery } from 'react-query'

function CollectionDetail() {
  const { user } = useContext(UserContext)
  const { id } = useParams()
  const [rightToEdit, setRightToEdit] = useState(false)
  const navigate = useNavigate()
  const {
    data: { collection, status },
    isLoading,
    refetch,
  } = useQuery(['collectionDetail'], getCollection(id))

  const defaultValues = useMemo(
    () => ({
      name: collection.name,
      description: collection.description,
    }),
    [collection]
  )

  useEffect(() => {
    if (status === 'ok') {
      setRightToEdit(
        user.role === 'ADMIN' ||
          (user.role === 'USER' && user.id === collection.authorId)
      )
    } else if (status === 'error') {
      navigate(routes.NOT_FOUND, {
        state: {
          message: t`Collection not found`,
        },
      })
    }
  }, [status, collection, user, navigate])

  return (
    <Container maxWidth="lg">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <CollectionContext.Provider
            value={{
              defaultValues,
              refetch,
            }}
          >
            <Grid container spacing={2}>
              {collection.img ? (
                <>
                  <Grid item xs={12} sm={6} md={4}>
                    <Box sx={{ position: 'sticky', top: 20 }}>
                      <Image src={collection.img} />
                    </Box>
                  </Grid>
                </>
              ) : (
                ''
              )}
              <Grid
                item
                xs={12}
                sm={collection.img ? 6 : 12}
                md={collection.img ? 8 : 12}
              >
                <Paper sx={{ p: 2, position: 'sticky', top: 20 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      width: '100%',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box>
                      <Typography
                        variant="subtitle1"
                        component={Link}
                        to={`${routes.USER_PROFILE}/${collection.author.id}`}
                        sx={{
                          mr: 2,
                          textDecoration: 'none',
                          color: 'text.primary',
                          '&:hover': {
                            textDecoration: 'underline',
                          },
                        }}
                      >
                        <Trans>Author: {collection.author.username}</Trans>
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: 'text.secondary' }}
                      >
                        {moment(collection.createdAt).format('LL')}
                      </Typography>
                    </Box>
                    <Box>
                      <CollectionMenu
                        rightToEdit={rightToEdit}
                        id={collection.id}
                      />
                    </Box>
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 500, textAlign: 'center' }}
                  >
                    {collection.name}
                  </Typography>

                  <Box sx={{ position: 'sticky', top: 20 }}>
                    <Typography
                      variant="overline"
                      textAlign="center"
                      sx={{
                        display: 'block',
                        textDecoration: 'none',
                        color: 'text.primary',
                      }}
                    >
                      {collection.type.name}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <ReactMarkdown>{collection.description}</ReactMarkdown>
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12}>
                {collection.items && collection.items.length ? (
                  <ItemTable
                    items={collection.items}
                    rightToEdit={rightToEdit}
                  />
                ) : (
                  <Typography variant="body1">
                    <em>
                      <Trans>No items in collection</Trans>
                    </em>
                  </Typography>
                )}
              </Grid>
              <AddItemForm
                rightToEdit={rightToEdit}
                collectionName={collection.name}
              />
            </Grid>
          </CollectionContext.Provider>
        </>
      )}
    </Container>
  )
}

export default CollectionDetail
