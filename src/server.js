
// Simple server for production preview
const express = require('express');
const path = require('path');
const { createRequestHandler } = require('@remix-run/express');

const app = express();
const port = process.env.PORT || 8080;

// Serve static files
app.use(express.static(path.join(__dirname, '../dist')));

// Handle API requests through middleware
app.use(async (req, res, next) => {
  if (req.path.startsWith('/api/convert')) {
    try {
      const { handleApiRequest } = require('./api/convertApi');
      const response = await handleApiRequest(new Request(
        `${req.protocol}://${req.get('host')}${req.originalUrl}`,
        {
          method: req.method,
          headers: req.headers,
          body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined
        }
      ));
      
      // Set status code
      res.status(response.status);
      
      // Set headers
      response.headers.forEach((value, key) => {
        res.setHeader(key, value);
      });
      
      // Send body
      const body = await response.json();
      res.json(body);
    } catch (error) {
      console.error('API error:', error);
      res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
    return;
  }
  
  next();
});

// Serve the index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
