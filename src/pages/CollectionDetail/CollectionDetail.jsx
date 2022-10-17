import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCollection } from '../../services/fetchCollections'
import { Container, Button, Typography, Divider, Grid } from '@mui/material'
import AddItemForm from '../../components/AddItemForm'
import ItemTable from '../../components/ItemTable'
import Loader from '../Loader/Loader'
import './CollectionDetail.css'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import routes from '../../constants/routes'
import Image from 'mui-image'

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
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4">{collection.name}</Typography>
          </Grid>
          {collection.img ? (
            <>
              <Grid item xs={12} sm={6} md={4}>
                <Image src={collection.img} />
              </Grid>
              <Grid item xs={12} sm={6} md={8}>
                <ReactMarkdown>{collection.description}</ReactMarkdown>
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
            <ItemTable items={collection.items} rightToEdit={rightToEdit} />
          </Grid>
          {rightToEdit && (
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                href="#add-item"
                onClick={() => setFormOpen(true)}
              >
                Add item
              </Button>
            </Grid>
          )}
          {formOpen ? (
            <Grid item xs={12}>
              <Typography
                id="add-item"
                sx={{ pt: 2, mt: -2 }}
                variant="h5"
              >{`Add item into "${collection.name}"`}</Typography>
              <Divider sx={{ mb: 2 }} />
              <AddItemForm />
            </Grid>
          ) : (
            ''
          )}
        </Grid>
      )}
    </Container>
  )
}

export default CollectionDetail
