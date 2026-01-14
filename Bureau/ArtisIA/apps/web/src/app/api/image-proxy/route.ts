import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return new NextResponse('Missing URL', { status: 400 });
  }

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch image');

    const blob = await response.blob();
    const headers = new Headers();
    headers.set('Content-Type', response.headers.get('Content-Type') || 'image/png');
    // Cache for performance
    headers.set('Cache-Control', 'public, max-age=3600');

    return new NextResponse(blob, { status: 200, headers });
  } catch (error) {
    console.error("Proxy error:", error);
    return new NextResponse('Error fetching image', { status: 500 });
  }
}
