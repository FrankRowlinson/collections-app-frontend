import { Box, Typography } from '@mui/material'
import { MarkdownPreview } from '../../../../common/components'
import { Trans } from '@lingui/macro'
import { useContext } from 'react'
import { FormContext } from '../../../../common/context'

export function DescriptionPreview() {
  const { control } = useContext(FormContext)
  return (
    <Box>
      <Typography variant="body1" sx={{ fontWeight: 500 }}>
        <Trans>Description preview with markdown</Trans>
      </Typography>
      <MarkdownPreview control={control} />
    </Box>
  )
}
