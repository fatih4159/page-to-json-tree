
import { convertHtmlToJson } from "../utils/htmlToJson";

export const handleApiRequest = async (request: Request): Promise<Response> => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  // Handle OPTIONS request (preflight)
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers, status: 204 });
  }

  try {
    const url = new URL(request.url);
    let targetUrl: string | null = null;

    // Check if it's a GET or POST request and extract the URL accordingly
    if (request.method === 'GET') {
      targetUrl = url.searchParams.get('url');
    } else if (request.method === 'POST') {
      const body = await request.json();
      targetUrl = body.url;
    }

    // Validate that a URL was provided
    if (!targetUrl) {
      return new Response(
        JSON.stringify({ error: 'URL parameter is required' }), 
        { headers, status: 400 }
      );
    }

    // Convert HTML to JSON
    const jsonTree = await convertHtmlToJson(targetUrl);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        url: targetUrl,
        data: jsonTree 
      }), 
      { headers, status: 200 }
    );
  } catch (error) {
    console.error('API error:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      }), 
      { headers, status: 500 }
    );
  }
};
