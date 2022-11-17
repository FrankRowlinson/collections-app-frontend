import { CircularProgress } from '@mui/material'

interface Props {
  inProgress: boolean,
  size?: number
}

export function ButtonProgress({ inProgress, size = 24 }: Props) {
  return (
    <>
      {inProgress && (
        <CircularProgress
          size={size}
          color="inherit"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: `-${size / 2}px`,
            marginLeft: `-${size / 2}px`,
          }}
        />
      )}
    </>
  )
}
