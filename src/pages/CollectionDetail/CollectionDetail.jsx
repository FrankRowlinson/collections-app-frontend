import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import routes from '../../constants/routes'
import { getCollection } from '../../services/fetchCollections'

function CollectionDetail() {
  const { id } = useParams()
  const [collection, setCollection] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      const collection = await getCollection(id)
      setCollection(collection)
    }
    fetchData()
  }, [id])
  useEffect(() => {
    collection ? setIsLoading(false) : setIsLoading(true)
  }, [collection])
  return (
    <>
      {isLoading ? '' : <div>{collection.name}</div>}
      <Link
        to={routes.ADD_ITEM + '/' + id}

      >
        Add item
      </Link>
    </>
  )
}

export default CollectionDetail
