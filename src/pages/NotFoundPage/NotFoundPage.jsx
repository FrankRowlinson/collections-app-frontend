import React from 'react'
import { useLocation } from 'react-router-dom'

function NotFoundPage() {
  const location = useLocation()
  return <>{location.state ? <div>{location.state.message}</div> : <div>404 NOT FOUND</div>}</>
}

export default NotFoundPage
