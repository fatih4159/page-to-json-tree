
/**
 * CORS Proxy Implementation Example
 * 
 * This is for reference only. In a real application, this would be 
 * implemented as a serverless function or backend service.
 */

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Extract the URL from the query parameters
  const targetUrl = req.query.url as string;

  if (!targetUrl) {
    return res.status(400).json({ error: 'URL parameter is required' });
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
    
    // Set the content type in the response
    res.setHeader('Content-Type', contentType);
    
    // Stream the response
    const data = await response.text();
    res.status(200).send(data);
    
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Failed to fetch the requested URL' });
  }
}
