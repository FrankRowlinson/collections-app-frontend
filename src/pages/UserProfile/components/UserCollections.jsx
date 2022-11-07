import React from 'react'
import { Grid, Button } from '@mui/material'
import { useInfiniteQuery } from 'react-query'
import { getUserCollections } from '../../../services/collectionAPI'
import { Loader } from '../../../shared'
import CollectionCard from './CollectionCard'

function UserCollections({ authorId }) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery([`${authorId}collections`], getUserCollections(authorId), {
      getNextPageParam: (lastPage) =>
        lastPage.collections.length < 8 ? undefined : lastPage.cursor,
    })
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {data.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.collections.map((item) => (
                <CollectionCard item={item} />
              ))}
            </React.Fragment>
          ))}
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
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
    </>
  )
}

export default UserCollections
