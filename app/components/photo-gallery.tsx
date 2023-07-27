'use client'

import { useState, useEffect } from "react"

export default function photoGallery() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const fetChData = async () => {
      const res = await fetch('/api/images');
      const data = await res.json()
      setData(data)
      setLoading(false)
    }

    fetChData().catch(console.error);
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.bio}</p>
    </div>
  )
}
