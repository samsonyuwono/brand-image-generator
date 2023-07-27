'use client'

import { useState, useEffect } from "react"
import Pagination from './pagination';

export default function photoGallery() {
  const [pageIndex, setPageIndex] = useState(1);
  const [data, setData] = useState(null)
  const [meta, setMeta] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/images', {
        method: 'POST',
        body: JSON.stringify({
          page: pageIndex,
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
  }, [pageIndex])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>

  return (
    <div>
      <h1 className="text-5xl text-center font-bold py-12">Brand Photo Generator</h1>

      <div className="grid grid-cols-4 gap-4">
        {data.map(item => (
          <div key={item.id} className="bg-gray-100 p-4 flex justify-center">
            <img src={item.attributes.thumbnail_url} alt={item.attributes.description} className="rounded-lg" />
            {/* <p>{item.attributes.description}</p> */}
          </div>
        ))}
        </div>

        <div className="flex justify-center py-12">
          <Pagination index={pageIndex} total={data.length} setIndex={setPageIndex}/>
        </div>
    </div>
  )
}


