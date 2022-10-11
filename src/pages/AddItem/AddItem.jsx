import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCollectionFields } from '../../services/getCollectionProps'

function AddItem() {
  const { id } = useParams()
  const [customFields, setCustomFields] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCollectionFields(id)
      console.log(data)
      setCustomFields(data)
      console.log(customFields)
    }
    fetchData()
  }, [id, customFields])

  return <div>AddItem</div>
}

export default AddItem
