import React from 'react'
import { Grid } from '@mui/material'
import { useInfiniteQuery } from 'react-query'
import { getUserCollections } from '../../../common/services'
import { Loader, LoadMoreButton } from '../../../common/components'
import { CollectionCard } from './'

interface Props {
  authorId: string
}

export function UserCollections({ authorId }: Props) {
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
          {data?.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.collections.map((item: CollectionInfo) => (
                <CollectionCard item={item} key={item.id} />
              ))}
            </React.Fragment>
          ))}
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <LoadMoreButton
              hasNextPage={!!hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              fetchNextPage={fetchNextPage}
            />
          </Grid>
        </>
      )}
    </>
  )
}
