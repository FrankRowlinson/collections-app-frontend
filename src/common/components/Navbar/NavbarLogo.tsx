import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'
import { routes } from '../../constants'

interface Props {
  variant: 'top' | 'drawer'
}

export function NavbarLogo({ variant }: Props) {
  const display = {
    drawer: 'block',
    top: { xs: 'none', lg: 'block' },
  }
  const my = {
    drawer: 3,
    top: 0,
  }

  return (
    <Typography
      variant="h6"
      component={Link}
      to={routes.HOME}
      color="inherit"
      sx={{
        display: display[variant],
        my: my[variant],
        textDecoration: 'none',
        zIndex: 1,
      }}
    >
      COLLECTIONS
    </Typography>
  )
}
