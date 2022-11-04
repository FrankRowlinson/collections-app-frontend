import { Chip, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { routes } from '../constants'

function Tag({ name, color = 'default' }) {
  const navigate = useNavigate()
  const handleTagSearch = async () => {
    navigate(routes.SEARCH_RESULTS, {
      state: {
        type: 'tag',
        query: name,
      },
    })
  }
  return (
    <Chip
      label={<Typography variant="overline">{name}</Typography>}
      onClick={handleTagSearch}
      color={color}
      sx={{ m: '3px' }}
    />
  )
}

export default Tag
