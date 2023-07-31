import { NextResponse } from 'next/server'

const apiKey = process.env.BRAND_FOLDER_API_KEY;
const photoGalleryId = process.env.BRAND_FOLDER_PHOTO_GALLERY_ID;
const BRAND_API = 'https://brandfolder.com/api/v4/';

export async function POST(req: Request) {
  const headers = new Headers();
  const body = await req.json();
  const { page } = body;

  headers.append('Authorization', `Bearer ${apiKey}`);

  const options: RequestInit = {
    method: 'GET',
    headers: headers,
    redirect: 'follow' as RequestRedirect
  }

  const params = encodeQueryData({
    page,
    per: 16,
    fields: 'cdn_url',
    // search: 'extension=png',
  })
  
  try {
    const response = await fetch(`${BRAND_API}collections/${photoGalleryId}/assets?${params}`, options);
    const result = await response.json();

    return NextResponse.json(result);
  } catch (error) {
    console.error('Brand Folder error', error);
  }
}

function encodeQueryData(data: Record<string, any>) {
  const ret = [];
  for (let d in data)
    ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
  return ret.join('&');
}
