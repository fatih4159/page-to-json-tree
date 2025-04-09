
import { handleApiRequest } from '../api/convertApi';

// This middleware function can be used in a production environment
// with frameworks that support middleware concepts like Express
export const apiMiddleware = async (req: Request): Promise<Response | null> => {
  const url = new URL(req.url);
  
  // Check if the request is for our API endpoint
  if (url.pathname === '/api/convert') {
    return handleApiRequest(req);
  }
  
  // Not an API request, continue normal routing
  return null;
};
