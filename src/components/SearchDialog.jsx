import { useState, useEffect } from 'react'
import {
  Dialog,
  Button,
  DialogContent,
  TextField,
  Backdrop,
  CircularProgress,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { search } from '../services/search'
import routes from '../constants/routes'
import { t, Trans } from '@lingui/macro'

function SearchDialog({ open, setOpen, handleClose }) {
  const navigate = useNavigate()
  const [inProgress, setInProgress] = useState(false)
  const { register, handleSubmit, setFocus } = useForm({
    shouldUnregister: true,
  })

  useEffect(() => {
    setTimeout(() => setFocus('search'), 100)
  }, [setFocus, open])

  const onSubmit = async (data) => {
    setInProgress(true)
    const response = await search(data)
    navigate(routes.SEARCH_RESULTS, {
      state: {
        items: response.items,
        query: t`Search results for: ${data.search}`,
      },
    })
    setInProgress(false)
    setOpen(false)
  }

  return (
    <Dialog maxWidth="md" fullWidth open={open} onClose={handleClose}>
      <Backdrop sx={{ color: '#fff' }} open={inProgress}>
        <CircularProgress color="inherit" />
      </Backdrop>
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
