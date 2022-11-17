import React from 'react'
import { t, Trans } from '@lingui/macro'
import { Typography, Grid, Container } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { search, searchByTag } from '../../services/searchAPI'
import { useInfiniteQuery } from 'react-query'
import { Loader, LoadMoreButton } from '../../shared'
import { SearchItem } from './components'

interface Page {
  cursor: number
  items: ItemInfo[]
}

const searchMethodMapping: Mapping = {
  search: search,
  tag: searchByTag,
}

const searchResultHeaders: Mapping = {
  tag: t`Search results by tag`,
  search: t`Search results for`,
}

export function SearchResults() {
  const {
    state: { type, query },
  } = useLocation()

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery([query], searchMethodMapping[type](query), {
      getNextPageParam: (lastPage: Page) =>
        lastPage.items.length < 5 ? undefined : lastPage.cursor,
    })

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2} sx={{ alignItems: 'stretch' }}>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ fontWeight: 500 }}>
            {searchResultHeaders[type] + (query ? `: ${query}` : '')}
          </Typography>
        </Grid>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {data?.pages.map((group, i) => (
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
                  group.items.map((item) => (
                    <SearchItem item={item} key={item.id} />
                  ))
                )}
              </React.Fragment>
            ))}
            <Grid
              item
              xs={12}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <LoadMoreButton
                hasNextPage={!!hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                fetchNextPage={fetchNextPage}
              />
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  )
}
