import { Grid, Paper, Box, Typography, Divider } from '@mui/material'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { CollectionContext } from '../../../common/context'
import { routes } from '../../../common/constants'
import moment from 'moment'
import { Trans } from '@lingui/macro'
import { CollectionMenu } from '.'
import ReactMarkdown from 'react-markdown'

export function CollectionInfo() {
  const { collection } = useContext(CollectionContext)
  return (
    <Grid
      item
      xs={12}
      sm={collection.img ? 6 : 12}
      md={collection.img ? 8 : 12}
    >
      <Paper sx={{ p: 2, position: 'sticky', top: 20 }}>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography
              variant="subtitle1"
              component={Link}
              to={`${routes.USER_PROFILE}/${collection.author.id}`}
              sx={{
                mr: 2,
                textDecoration: 'none',
                color: 'text.primary',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              <Trans>Author: {collection.author.username}</Trans>
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {moment(collection.createdAt).format('LL')}
            </Typography>
          </Box>
          <Box>
            <CollectionMenu />
          </Box>
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 500, textAlign: 'center' }}>
          {collection.name}
        </Typography>

        <Box sx={{ position: 'sticky', top: 20 }}>
          <Typography
            variant="overline"
            textAlign="center"
            sx={{
              display: 'block',
              textDecoration: 'none',
              color: 'text.primary',
            }}
          >
            {collection.type.name}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <ReactMarkdown>{collection.description}</ReactMarkdown>
        </Box>
      </Paper>
    </Grid>
  )
}
