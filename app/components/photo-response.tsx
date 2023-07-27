'use client'

import { useState, useEffect } from "react"
import { POST } from "../api/chat/route"

async function PhotoResponse(prompt: any) {
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const handleGenerateImage = async () => {
      try {
      
        const response = await fetch('/api/chat', {method: 'POST'});
        console.log('response', response)
        setImageUrl(response);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    handleGenerateImage();
  }, [prompt]);

    

  if (isLoading) return <p>Loading...</p>

  return (
    <div>
      <img src={imageUrl} alt="Generated Image" />
    </div>
  )
}

export default PhotoResponse;