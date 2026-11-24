import { NextRequest, NextResponse } from 'next/server';

async function handler(req: NextRequest) {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!backendUrl) {
    return new NextResponse(JSON.stringify({ success: false, message: 'Backend API URL is not configured.' }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }

  const requestedPath = req.nextUrl.pathname.replace(/^\/api-proxy/, '');
  const targetUrl = `${backendUrl}${requestedPath}${req.nextUrl.search}`;

  const headers = new Headers(req.headers);
  headers.set('host', new URL(targetUrl).host);
  headers.set('ngrok-skip-browser-warning', 'true');
  
  // PENTING: Hapus header content-length karena Next.js akan menghitung ulang
  // dan hapus accept-encoding agar tidak terjadi error decoding (seperti masalah login sebelumnya)
  headers.delete('content-length');
  headers.delete('accept-encoding');

  try {
    // Gunakan req.body langsung, JANGAN req.blob() atau req.json()
    // Ini agar FormData (multipart) tetap utuh saat diteruskan ke backend
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: headers,
      body: req.body,
      // @ts-ignore (Diperlukan di Next.js untuk streaming body)
      duplex: 'half', 
      redirect: 'follow',
    });

    // Teruskan response apa adanya kembali ke browser
    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  } catch (error) {
    console.error('API proxy error:', error);
    return new NextResponse(JSON.stringify({ success: false, message: 'Proxy request failed.' }), { 
      status: 502,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export { handler as GET, handler as POST, handler as PUT, handler as PATCH, handler as DELETE };