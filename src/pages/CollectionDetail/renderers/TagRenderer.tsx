import { Chip } from '@mui/material'

type Tag = {
  id: string
  name: string
}

export const TagRenderer = (params: any) => {
  return (
    <>
      {params.data.tags &&
        params.data.tags.map((el: Tag) => (
          <Chip
            key={el.id}
            size="small"
            variant="outlined"
            label={el.name}
            sx={{ m: '1px' }}
          />
        ))}
    </>
  )
}
