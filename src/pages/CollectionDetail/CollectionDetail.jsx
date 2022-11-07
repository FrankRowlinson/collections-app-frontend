import { t, Trans } from '@lingui/macro'
import { Box, Container, Divider, Grid, Paper, Typography } from '@mui/material'
import moment from 'moment'
import Image from 'mui-image'
import { useContext, useEffect, useState } from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { useQuery } from 'react-query'
import { Link, Navigate, useParams } from 'react-router-dom'
import { routes } from '../../constants'
import { CollectionContext, UserContext } from '../../context'
import { getCollection } from '../../services/collectionAPI'
import { Loader } from '../../shared'
import './CollectionDetail.css'
import { CollectionMenu, AddItemForm, ItemTable } from './components'

function CollectionDetail() {
  const { user } = useContext(UserContext)
  const { id } = useParams()
  const [rightToEdit, setRightToEdit] = useState(false)
  const { data, isLoading, refetch } = useQuery([id], getCollection(id))

  useEffect(() => {
    if (data) {
      if (data.status === 'ok') {
        setRightToEdit(
          user.role === 'ADMIN' ||
            (user.role === 'USER' && user.id === data.collection.authorId)
        )
      }
    }
  }, [data, user])

  return (
    <Container maxWidth="lg">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {data.status === 'ok' ? (
            <CollectionContext.Provider
              value={{
                defaultValues: {
                  name: data.collection.name,
                  description: data.collection.description,
                },
                refetch,
              }}
            >
              <Grid container spacing={2}>
                {data.collection.img ? (
                  <>
                    <Grid item xs={12} sm={6} md={4}>
                      <Box sx={{ position: 'sticky', top: 20 }}>
                        <Image src={data.collection.img} />
                      </Box>
                    </Grid>
                  </>
                ) : (
                  ''
                )}
                <Grid
                  item
                  xs={12}
                  sm={data.collection.img ? 6 : 12}
                  md={data.collection.img ? 8 : 12}
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
                          to={`${routes.USER_PROFILE}/${data.collection.author.id}`}
                          sx={{
                            mr: 2,
                            textDecoration: 'none',
                            color: 'text.primary',
                            '&:hover': {
                              textDecoration: 'underline',
                            },
                          }}
                        >
                          <Trans>
                            Author: {data.collection.author.username}
                          </Trans>
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: 'text.secondary' }}
                        >
                          {moment(data.collection.createdAt).format('LL')}
                        </Typography>
                      </Box>
                      <Box>
                        <CollectionMenu
                          rightToEdit={rightToEdit}
                          id={data.collection.id}
                        />
                      </Box>
                    </Box>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 500, textAlign: 'center' }}
                    >
                      {data.collection.name}
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
                        {data.collection.type.name}
                      </Typography>
                      <Divider sx={{ my: 1 }} />
                      <ReactMarkdown>
                        {data.collection.description}
                      </ReactMarkdown>
                    </Box>
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  {data.collection.items && data.collection.items.length ? (
                    <ItemTable
                      items={data.collection.items}
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
                  collectionName={data.collection.name}
                  refetch={refetch}
                />
              </Grid>
            </CollectionContext.Provider>
          ) : (
            <Navigate
              to={routes.NOT_FOUND}
              state={{
                message: t`Collection not found`,
              }}
            />
          )}
        </>
      )}
    </Container>
  )
}

export default CollectionDetail
