import { Grid, Typography, Stack, Box, Divider } from '@mui/material'
import { Trans, t } from '@lingui/macro'
import { Image } from 'mui-image'
import moment from 'moment'
import { usePlaceholder } from '../../../hooks'

interface Props {
  data: User
}

export function UserInfo({ data }: Props) {
  const placeholder = usePlaceholder(t`Avatar`)
  return (
    <>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'between' }}>
        <Typography variant="h5" sx={{ fontWeight: 500 }}>
          <Trans>{data.username}'s profile</Trans>
        </Typography>
        <Box flexGrow={1}></Box>
        <Typography
          title={data.role.toLowerCase()}
          variant="h5"
          sx={{ cursor: 'help' }}
        >
          {data.role === 'USER' ? '👩🏻‍🦲' : '👮🏻‍♂️'}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Image src={placeholder} />
      </Grid>
      <Grid item xs={12} sm={6} md={8} lg={9}>
        <Stack spacing={2}>
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            <Trans>Accomplishments</Trans>
          </Typography>
          <Typography variant="body1">
            <Trans>
              <strong>Collections added:</strong> {data._count?.collections}
            </Trans>
          </Typography>
          <Typography variant="body1">
            <Trans>
              <strong>Total items in all collections:</strong>{' '}
              {data._count?.items}
            </Trans>
          </Typography>
          <Typography variant="body1">
            <Trans>
              <strong>Comments left:</strong> {data._count?.comments}
            </Trans>
          </Typography>
          <Divider />
          <Typography variant="overline">
            <Trans>Registered for {moment(data.createdAt).fromNow(true)}</Trans>
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          <Trans>Personal collections</Trans>
        </Typography>
        <Divider />
      </Grid>
    </>
  )
}
