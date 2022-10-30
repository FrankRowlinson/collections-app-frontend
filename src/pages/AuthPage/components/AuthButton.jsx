import { Button } from '@mui/material'
import ButtonProgress from '../../../shared/ButtonProgress'

function AuthButton({ inProgress, text }) {
  return (
    <Button
      variant="contained"
      disabled={inProgress}
      type="submit"
      fullWidth
      sx={{ position: 'relative' }}
    >
      {text}
      <ButtonProgress inProgress={inProgress} />
    </Button>
  )
}

export default AuthButton
