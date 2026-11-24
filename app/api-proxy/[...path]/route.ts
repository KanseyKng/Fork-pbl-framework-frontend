// app/api-proxy/[...path]/route.ts
import { NextRequest, NextResponse } from 'next/server';

async function handler(req: NextRequest) {
  // Ambil URL backend dari environment variable
  const backendUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!backendUrl) {
    return new NextResponse('Backend API URL is not configured.', { status: 500 });
  }

  // Rekonstruksi path dan query params
  const requestedPath = req.nextUrl.pathname.replace(/^\/api-proxy/, '');
  const targetUrl = `${backendUrl}${requestedPath}${req.nextUrl.search}`;

  // Clone headers dan tambahkan header wajib untuk Ngrok
  const headers = new Headers(req.headers);
  headers.set('host', new URL(targetUrl).host);
  headers.set('ngrok-skip-browser-warning', 'true'); // ✅ Kunci untuk melewati peringatan Ngrok
  headers.set('Connection', 'keep-alive');

  // Ambil body untuk request non-GET
  const body = req.method !== 'GET' && req.method !== 'HEAD' ? await req.blob() : undefined;

  try {
    // Lakukan request dari server Next.js ke Ngrok
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: headers,
      body: body,
      redirect: 'follow',
    });

    // Kembalikan response ke browser
    return response;
  } catch (error) {
    console.error('API proxy error:', error);
    return new NextResponse('Proxy request failed.', { status: 502 });
  }
}

export { handler as GET, handler as POST, handler as PUT, handler as PATCH, handler as DELETE };