import { t } from '@lingui/macro'
import { Chip, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import routes from '../constants/routes'
import { searchByTag } from '../services/search'

function Tag({ name, setInProgress, inCloud, color = 'default' }) {
  const navigate = useNavigate()
  const handleTagSearch = async () => {
    setInProgress(true)
    const response = await searchByTag(name)
    navigate(routes.SEARCH_RESULTS, {
      state: {
        items: response.items,
        query: t`Search results by tag: ${name}`,
      },
    })
    setInProgress(false)
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