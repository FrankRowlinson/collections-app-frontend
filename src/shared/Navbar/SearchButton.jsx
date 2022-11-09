import { Button, Typography } from '@mui/material'
import { Trans } from '@lingui/macro'
import { MdSearch } from 'react-icons/md'
import { SearchDialog } from './'
import { useState } from 'react'

function SearchButton() {
  const [searchDialogOpen, setSearchDialogOpen] = useState(false)

  const handleSearchDialogOpen = () => {
    setSearchDialogOpen(true)
  }
  const handleSearchDialogClose = () => {
    setSearchDialogOpen(false)
  }
  return (
    <>
      <SearchDialog
        open={searchDialogOpen}
        setOpen={setSearchDialogOpen}
        handleClose={handleSearchDialogClose}
      />
      <Button
        sx={{
          border: '1px solid',
          p: { xs: '5px 0', md: '5px 30px 5px 10px' },
          cursor: 'text',
        }}
        color="inherit"
        onClick={handleSearchDialogOpen}
        startIcon={<MdSearch />}
      >
        <Typography
          sx={{
            display: { md: 'block', xs: 'none' },
            textTransform: 'none',
            color: 'text.secondary',
          }}
        >
          <Trans>Search...</Trans>
        </Typography>
      </Button>
    </>
  )
}

export default SearchButton
