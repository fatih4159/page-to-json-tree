
/**
 * CORS Proxy Implementation Example
 * 
 * This is for reference only. In a real application, this would be 
 * implemented as a serverless function or backend service.
 */

interface RequestParams {
  url: string;
}

export default async function handler(request: Request): Promise<Response> {
  // Get the URL from the request (either from query params or body)
  const url = new URL(request.url);
  const targetUrl = url.searchParams.get('url');

  if (!targetUrl) {
    return new Response(JSON.stringify({ error: 'URL parameter is required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  try {
    // Validate URL
    new URL(targetUrl);
    
    // Fetch the content from the target URL
    const response = await fetch(targetUrl, {
      headers: {
        // Sometimes setting a User-Agent helps
        'User-Agent': 'Mozilla/5.0 (compatible; HTMLtoJSONBot/1.0)',
      },
    });

    // Get the content type
    const contentType = response.headers.get('content-type') || 'text/html';
    
    // Forward the response
    const data = await response.text();
    return new Response(data, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
      }
    });
    
  } catch (error) {
    console.error('Proxy error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch the requested URL' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  }
}
