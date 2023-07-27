import { NextApiRequest, NextApiResponse } from 'next'

const apiKey = process.env.BRAND_FOLDER_API_KEY;
const photoGalleryId = process.env.BRAND_FOLDER_PHOTO_GALLERY_ID;
const BRAND_FOLDER = 'https://brandfolder.com/api/v4/';

export async function POST(req: NextApiRequest) {
  const headers = new Headers();
  const body = await req.json()
  const { page } = body;

  headers.append('Authorization', `Bearer ${apiKey}`);

  const options = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
  }

  async function fetchBrandFolderAssets() {
    try {
      const response = await fetch(`${BRAND_FOLDER}collections/${photoGalleryId}/assets?page=${page || 1}`, options);
      const result = await response.text();

      return new Response(result, {
        headers: { 'Content-Type': 'application/json'}
      });
    } catch (error) {
      console.log('Brand Folder error', error);
    }
  }

  return fetchBrandFolderAssets();
}
