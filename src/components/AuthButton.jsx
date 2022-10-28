import { Button } from '@mui/material'
import ButtonProgress from './ButtonProgress'

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
      <ButtonProgress size={24} inProgress={inProgress} />
    </Button>
  )
}

export default AuthButton
