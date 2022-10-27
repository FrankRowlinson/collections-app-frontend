import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCollection } from '../../services/fetchCollections'
import {
  Container,
  Button,
  Typography,
  Divider,
  Grid,
  Box,
} from '@mui/material'
import AddItemForm from '../../components/AddItemForm'
import ItemTable from '../../components/ItemTable'
import Loader from '../Loader/Loader'
import './CollectionDetail.css'
import { UserContext } from '../../context/UserContext'
import { useNavigate, Link } from 'react-router-dom'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import routes from '../../constants/routes'
import Image from 'mui-image'
import CollectionMenu from './CollectionMenu'

function CollectionDetail() {
  const { user } = useContext(UserContext)
  const { id } = useParams()
  const [rightToEdit, setRightToEdit] = useState(false)
  const [collection, setCollection] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [formOpen, setFormOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCollection(id)
      response.error
        ? navigate(routes.NOT_FOUND, {
            state: { message: 'Collection not found' },
          })
        : setCollection(response.collection)
    }
    fetchData()
  }, [id, navigate])

  useEffect(() => {
    if (collection) {
      setIsLoading(false)
      setRightToEdit(
        user.role === 'ADMIN' ||
          (user.role === 'USER' && user.id === collection.authorId)
      )
    } else {
      setIsLoading(true)
    }
  }, [collection, user, navigate])

  return (
    <Container maxWidth="lg">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h5" sx={{ fontWeight: 500 }}>
              {collection.name}
            </Typography>
            <CollectionMenu rightToEdit={rightToEdit} />
          </Box>
          <Grid container spacing={2}>
            {collection.img ? (
              <>
                <Grid item xs={12} sm={6} md={4}>
                  <Box sx={{ position: 'sticky', top: 20 }}>
                    <Image src={collection.img} />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={8}>
                  <Box sx={{ position: 'sticky', top: 20 }}>
                    <Typography
                      variant="subtitle1"
                      component={Link}
                      to={`${routes.USER_PROFILE}/${collection.author.id}`}
                      sx={{
                        textDecoration: 'none',
                        color: 'text.primary',
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      Author: {collection.author.username}
                    </Typography>
                    <ReactMarkdown>{collection.description}</ReactMarkdown>
                  </Box>
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12}>
                  There is no cover image for this collection
                </Grid>
                <Grid item xs={12}>
                  <ReactMarkdown>{collection.description}</ReactMarkdown>
                </Grid>
              </>
            )}

            <Grid item xs={12}>
              {collection.items && collection.items.length ? (
                <ItemTable items={collection.items} rightToEdit={rightToEdit} />
              ) : (
                <Typography variant="body1">
                  <em>No items in collection</em>
                </Typography>
              )}
            </Grid>

            {rightToEdit && (
              <Grid item xs={12}>
                <Button
                  variant={formOpen ? 'outlined' : 'contained'}
                  color={formOpen ? 'error' : 'primary'}
                  href="#add-item"
                  onClick={() => setFormOpen(!formOpen)}
                >
                  {formOpen ? 'Cancel' : 'Add item'}
                </Button>
              </Grid>
            )}
            {formOpen && (
              <Grid item xs={12}>
                <Typography
                  id="add-item"
                  sx={{ pt: 1, mt: -1, fontWeight: 500 }}
                  variant="h6"
                >{`Add item into "${collection.name}"`}</Typography>
                <Divider sx={{ mb: 2 }} />
                <AddItemForm />
              </Grid>
            )}
          </Grid>
        </>
      )}
    </Container>
  )
}

export default CollectionDetail
