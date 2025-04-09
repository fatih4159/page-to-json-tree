
import React, { useEffect } from 'react';
import { handleApiRequest } from '../../api/convertApi';

// This component will never render, it's just a placeholder for the route
const HtmlToJsonApi: React.FC = () => {
  useEffect(() => {
    // This will never execute as we're intercepting the request before rendering
    console.warn('API route component rendered, this should not happen');
  }, []);

  return <div>API Route - Not Meant To Render</div>;
};

export default HtmlToJsonApi;
