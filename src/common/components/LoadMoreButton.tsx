import { Button } from '@mui/material'
import { t } from '@lingui/macro'

interface Props {
  hasNextPage: boolean,
  fetchNextPage: () => void,
  isFetchingNextPage: boolean
}

export function LoadMoreButton({ hasNextPage, fetchNextPage, isFetchingNextPage }: Props) {
  return (
    <Button
      size="large"
      variant="outlined"
      color="inherit"
      onClick={() => fetchNextPage()}
      disabled={isFetchingNextPage}
      sx={{ display: !hasNextPage ? 'none' : 'block' }}
    >
      {isFetchingNextPage
        ? t`Loading more...`
        : hasNextPage
        ? t`Load More`
        : t`Nothing more to load`}
    </Button>
  )
}
