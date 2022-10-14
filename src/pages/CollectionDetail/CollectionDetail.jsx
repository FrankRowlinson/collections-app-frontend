import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCollection } from '../../services/fetchCollections'
import { Container, Button, Typography, Divider, Grid } from '@mui/material'
import AddItemForm from '../../components/AddItemForm'
import ItemTable from '../../components/ItemTable'
import Loader from '../Loader/Loader'

function CollectionDetail() {
  const { id } = useParams()
  const [collection, setCollection] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [formOpen, setFormOpen] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      const collection = await getCollection(id)
      setCollection(collection)
    }
    fetchData()
  }, [id])
  useEffect(() => {
    collection ? setIsLoading(false) : setIsLoading(true)
  }, [collection])
  return (
    <Container maxWidth='lg'>
      {isLoading ? (
        <Loader />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4">{collection.name}</Typography>
          </Grid>
          <Grid item xs={12}>
            <ItemTable items={collection.items} />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={() => setFormOpen(true)}>Add item</Button>
          </Grid>
          {formOpen ? (
            <Grid item xs={12}>
              <Typography variant="h5">{`Add item into "${collection.name}"`}</Typography>
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
