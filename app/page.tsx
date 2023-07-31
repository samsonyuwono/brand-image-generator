'use client'

import { useState } from "react";
import PhotoGallery, { BrandImageType } from "./components/photo-gallery";
import {
  Button,
  Spinner,
  Dialog,
  DialogHeader,
  DialogBody,
  Carousel
} from "@material-tailwind/react";


export default function App() {
  const [selectedImages, setSelectedImages] = useState<BrandImageType[]>([]);
  const [generatedImages, setGeneratedImages] = useState([])
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleOpen = (value: boolean) => {
    if (!showDialog) setGeneratedImages([])
    setShowDialog(value)
  };

  const handleGenerateImage = async () => {
    let selectedImageUrl = selectedImages[0].attributes.cdn_url || ""

    if (!selectedImageUrl) return;

    setLoading(true);
    setShowDialog(true);

    try {
      const resp = await fetch("/api/images/variation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: selectedImageUrl + '&width=1024' }),
      });

      if (!resp.ok) {
        throw new Error("Unable to generate the image");
      }

      const data = await resp.json();

      setGeneratedImages(data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setShowDialog(false);
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-5xl py-24 mx-auto stretch">
      <h1 className="text-6xl text-center font-bold pb-12 pt-8 text-blue-gray-800">Brand Photo Generator</h1>

      <div className="flex justify-end gap-3 mb-4">
        <Button className="flex items-center gap-3" disabled={!selectedImages.length} onClick={handleGenerateImage}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
          </svg>
          Generate Variations
        </Button>
      </div>

      <PhotoGallery images={selectedImages} setImages={setSelectedImages} />

      <Dialog open={showDialog} handler={handleOpen}>
        <DialogHeader>Generated Images</DialogHeader>
        <DialogBody>
          {!generatedImages.length ? <div className="flex justify-center"><Spinner /></div> : (
            <Carousel className="rounded-sm">
              {generatedImages.map(({url}, i) => (
                <img src={url} className="image h-full w-full object-cover" alt={`Generated Image ${i + 1}`} />
              ))}
            </Carousel>
          )}
        </DialogBody>
      </Dialog>
    </div>
  )
}
