import { NextApiRequest, NextApiResponse } from 'next'

const apiKey = process.env.BRAND_FOLDER_API_KEY;
const photoGalleryId = process.env.BRAND_FOLDER_PHOTO_GALLERY_ID;
const BRAND_FOLDER = 'https://brandfolder.com/api/v4/';

export async function GET(req: NextApiRequest) {
  // const data = await fetch(`${BRAND_FOLDER}/collections}/`, {
  const data = { name: 'John Doe', bio: 'Web Developer' };

  const response = new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json'}
  });

  return response;
}
