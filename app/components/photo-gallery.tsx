'use client'

import React, { useState, useEffect } from "react"
import Pagination from './pagination';
import { IconButton } from "@material-tailwind/react";

export type BrandImageType = {
  id: string;
  attributes: {
    name: string;
    description: string;
    thumbnail_url: string;
    cdn_url: string;
  }
}

type PhotoGalleryProps = {
  images: BrandImageType[],
  setImages: React.SetStateAction<any>,
}

export default function photoGallery({ images, setImages }: PhotoGalleryProps) {
  const [pageIndex, setPageIndex] = useState(1);
  const [data, setData] = useState([])
  const [meta, setMeta] = useState(null)
  const [isLoading, setLoading] = useState(true)

  const handleSelect = (id: string) => {
    const image = data.find((item: any) => item.id === id)

    // if (images.includes(image) || isActive(id)) {
    //   setImages(images.filter(item => item.id !== id));
    // } else {
    //   setImages([...images, image]);
    // }

    // Limit it to one selection so far
    if (isActive(id)) {
      setImages([])
    } else {
      setImages([image]);
    }
  }

  const isActive = (id: string) => {
    return images.some(item => item.id === id)
  }

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
      setLoading(false)
    }

    fetchData().catch(console.error);
  }, [pageIndex])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No photos found</p>

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 min-h-[50%]">
        {data.map((item: any) => (
          <div
            key={item.id}
            className="relative border-solid border-2 aspect-auto bg-blue-gray-50 border-gray-100 p-1 flex justify-center rounded-sm cursor-pointer hover:outline hover:outline-blue-100 hover:outline-2"
            onClick={() => handleSelect(item.id)}
          >
            <img
              src={item.attributes.thumbnail_url}
              alt={item.attributes.description}
              className="select-none"
              loading="lazy"
            />

            {isActive(item.id) && (
              <div className="absolute top-1 right-1 bg-blue-800 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center py-12">
        <Pagination index={pageIndex} total={data.length} setIndex={setPageIndex} />
      </div>
    </div>
  )
}


