import { Trans } from '@lingui/macro'
import React from 'react'
import { useLocation } from 'react-router-dom'

function NotFoundPage() {
  const location = useLocation()
  return (
    <>
      {location.state ? (
        <div>{location.state.message}</div>
      ) : (
        <div>
          <Trans>404 NOT FOUND</Trans>
        </div>
      )}
    </>
  )
}

export default NotFoundPage
