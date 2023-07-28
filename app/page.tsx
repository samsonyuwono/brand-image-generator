'use client'

import { useState } from "react";
import PhotoGallery from './components/photo-gallery';

export default function Chat() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [generatedImage, setGeneratedImage] = useState("")
  const [loading, setLoading] = useState(false);
  console.log({ selectedImages })
  let selectedImageUrl = selectedImages.length > 0 ? selectedImages[0].attributes.thumbnail_url : ""

  const handleGenerateImage = async () => {
    setLoading(true);
    try {
      const resp = await fetch("/api/images/variation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: selectedImageUrl }),
      });
   
      if (!resp.ok) {
        throw new Error("Unable to generate the image");
      }

      const data = await resp.json();

      setGeneratedImage(data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  
  

  return (
    <div className="flex flex-col w-full max-w-5xl py-24 mx-auto stretch">
      <PhotoGallery images={selectedImages} setImages={setSelectedImages} />

      <h1 className="text-5xl text-center font-bold py-12">Generate Dall E Variation</h1>
        {
          generatedImage
          ? 
          <div className="bg-gray-600 aspect-square flex items-center justify-center">
              <img src={generatedImage} className="image" alt="ai thing" />
            </div>
          : <div className="bg-gray-600 aspect-square flex items-center justify-center">
              Image will show up here
            </div>
        }

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
        onClick={() => handleGenerateImage()}>{loading ? "Generating, please wait" : "Generate Image"}</button>
    </div>
  )
}
