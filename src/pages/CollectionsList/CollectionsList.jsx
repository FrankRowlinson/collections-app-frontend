import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { getCollectionsByUser } from '../../services/fetchCollections'

function CollectionsList() {
  const { userId } = useParams()
  const { user } = useContext(UserContext)
  const [collections, setCollections] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      // either use id from parameters or id of a user that is logged in
      const authorId = userId ? userId : user.id
      const data = await getCollectionsByUser(authorId)
      setCollections(data.collections)
      console.log(data.collections)
    }
    fetchData()
  }, [userId, user.id])
  return (
    <div>
      {collections
        ? collections.map((el) => {
            return <div>{el.id}
            <img src={el.img} alt=''/></div>
          })
        : ''}
    </div>
  )
}

export default CollectionsList
