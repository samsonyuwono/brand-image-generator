'use client'

import { useState, useEffect } from "react"
import Pagination from './pagination';

export default function photoGallery() {
  const [data, setData] = useState(null)
  const [meta, setMeta] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/images', {
        method: 'POST',
        body: JSON.stringify({
          page: 2,
        }),
      });

      const { data, meta } = await res.json()

      setData(data)
      setMeta(meta)

      console.log(data);
      console.log(meta);

      setLoading(false)
    }

    fetchData().catch(console.error);
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>

  return (
    <div>
      <h1 className="text-4xl font-bold py-12">Brand Photo Library</h1>

      <div className="grid grid-cols-3 gap-6">
        {data.map(item => (
          <div key={item.id}>
            <img src={item.attributes.thumbnail_url} alt={item.attributes.description} />
            {/* <p>{item.attributes.description}</p> */}
          </div>
        ))}
        </div>

        <Pagination />
    </div>
  )
}


