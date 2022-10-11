import React from 'react'
import { useState, useEffect } from 'react'
import { getBiggestCollections } from '../../services/fetchCollections'

function Home() {
  const [biggestCollections, setBiggestCollections] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getBiggestCollections()
      setBiggestCollections(data.collections)
    }
    fetchData()
  }, [])
  return <div>Biggest collections: {biggestCollections ? biggestCollections.map((el) => {
    return <div>{el.name}</div>
  }) : ''}</div>
}

export default Home
