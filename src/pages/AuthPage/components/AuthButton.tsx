import { Button } from '@mui/material'
import { ButtonProgress } from '../../../shared'

interface Props {
  inProgress: boolean
  text: string
}

export function AuthButton({ inProgress, text }: Props) {
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
