import React from 'react'
import { t, Trans } from '@lingui/macro'
import { Typography, Grid, Container, Button } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { search, searchByTag } from '../../services/searchAPI'
import { useInfiniteQuery } from 'react-query'
import { Loader } from '../../shared'
import { SearchItem } from './components'

const searchMethodMapping = {
  search: search,
  tag: searchByTag,
}

function SearchResults() {
  const {
    state: { type, query },
  } = useLocation()

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery([query], searchMethodMapping[type](query), {
      getNextPageParam: (lastPage) =>
        lastPage.items.length < 5 ? undefined : lastPage.cursor,
    })

  const searchResultHeaders = {
    tag: t`Search results by tag`,
    search: t`Search results for`,
  }

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ fontWeight: 500 }}>
            {searchResultHeaders[type] + (query ? `: ${query}` : '')}
          </Typography>
        </Grid>
        {status === 'loading' ? (
          <Loader />
        ) : (
          <>
            {data.pages.map((group, i) => (
              <React.Fragment key={i}>
                {i === 0 && group.items.length === 0 ? (
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      <Trans>
                        Your search - <strong>{query}</strong> - did not match
                        any items
                      </Trans>
                    </Typography>
                  </Grid>
                ) : (
                  group.items.map((item, index) => (
                    <SearchItem item={item} key={index} />
                  ))
                )}
              </React.Fragment>
            ))}
            <Grid
              item
              xs={12}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Button
                size="large"
                variant="outlined"
                color="inherit"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                sx={{ display: !hasNextPage ? 'none' : 'block' }}
              >
                {isFetchingNextPage
                  ? 'Loading more...'
                  : hasNextPage
                  ? 'Load More'
                  : 'Nothing more to load'}
              </Button>
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  )
}

export default SearchResults
