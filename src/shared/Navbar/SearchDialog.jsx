import { Trans } from '@lingui/macro'
import { Button, Dialog, DialogContent, TextField } from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../constants'

function SearchDialog({ open, setOpen, handleClose }) {
  const navigate = useNavigate()
  const { register, handleSubmit, setFocus } = useForm({
    shouldUnregister: true,
  })

  useEffect(() => {
    setTimeout(() => setFocus('search'), 100)
  }, [setFocus, open])

  const onSubmit = async (data) => {
    navigate(routes.SEARCH_RESULTS, {
      state: {
        type: 'search',
        query: data.search,
      },
    })
    setOpen(false)
  }

  return (
    <Dialog maxWidth="md" fullWidth open={open} onClose={handleClose}>
      {open ? (
        <DialogContent sx={{ m: 0, p: 1 }}>
          <form
            style={{ position: 'relative' }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              color="warning"
              variant="outlined"
              autoComplete="off"
              fullWidth
              {...register('search', { required: true })}
            />
            <Button
              type="submit"
              variant="outlined"
              color="inherit"
              sx={{ position: 'absolute', right: 10, top: 10, bottom: 10 }}
            >
              <Trans>Search</Trans>
            </Button>
          </form>
        </DialogContent>
      ) : (
        ''
      )}
    </Dialog>
  )
}

export default SearchDialog
