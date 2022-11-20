import { t, Trans } from '@lingui/macro'
import { Container, Grid, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Navigate, useParams } from 'react-router-dom'
import { routes } from '../../common/constants'
import { CollectionContext, UserContext } from '../../common/context'
import { getCollection } from '../../common/services'
import { Loader } from '../../common/components'
import './CollectionDetail.css'
import {
  AddItemForm,
  ItemTable,
  CollectionCover,
  CollectionInfo,
} from './components'

interface RouterParams {
  id: string
}

export function CollectionDetail() {
  const { user } = useContext(UserContext)
  const { id } = useParams<keyof RouterParams>() as RouterParams
  const [rightToEdit, setRightToEdit] = useState(false)
  const { data, isLoading, refetch } = useQuery([id], getCollection(id))

  useEffect(() => {
    if (data) {
      if (data.status === 'ok') {
        setRightToEdit(
          user?.role === 'ADMIN' || user?.id === data.collection.authorId
        )
      }
    }
  }, [data, user])

  return (
    <Container maxWidth="lg">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {data.status === 'ok' ? (
            <CollectionContext.Provider
              value={{
                defaultValues: {
                  name: data.collection.name,
                  description: data.collection.description,
                },
                refetch,
                collection: data.collection,
                rightToEdit,
              }}
            >
              <Grid container spacing={2}>
                {data.collection.img && <CollectionCover />}
                <CollectionInfo />
                <Grid item xs={12}>
                  {data.collection.items.length ? (
                    <ItemTable
                      items={data.collection.items}
                      rightToEdit={rightToEdit}
                    />
                  ) : (
                    <Typography variant="body1">
                      <em>
                        <Trans>No items in collection</Trans>
                      </em>
                    </Typography>
                  )}
                </Grid>
                <AddItemForm />
              </Grid>
            </CollectionContext.Provider>
          ) : (
            <Navigate
              to={routes.NOT_FOUND}
              state={{
                message: t`Collection not found`,
              }}
            />
          )}
        </>
      )}
    </Container>
  )
}
