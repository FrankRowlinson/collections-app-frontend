import React from 'react'
import { Typography, Grid, Card, CardContent } from '@mui/material'
import { useLocation } from 'react-router-dom'

function SearchResults() {
  const {
    state: { query, items },
  } = useLocation()
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h5">
          {query ? `Search results for: "${query}"` : 'Selected items'}
        </Typography>
      </Grid>
      {items ? (
        items.map((el) => (
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardContent>{el.name}</CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Typography variant="h6">
          Found nothing... try different query
        </Typography>
      )}
    </Grid>
  )
}

export default SearchResults
