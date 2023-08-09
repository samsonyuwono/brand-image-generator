'use client'

import { useState } from "react";
import PhotoGallery, { BrandImageType } from "./components/photo-gallery";
import GenerateVariationButton from "./components/generate-variation-button";
import generateImageVariation from "./utils/generate-image-variation";
import {
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
      const data = await generateImageVariation(selectedImageUrl);

      setGeneratedImages(data);
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
      <GenerateVariationButton selectedImages={selectedImages} handleGenerateImage={handleGenerateImage} />
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
