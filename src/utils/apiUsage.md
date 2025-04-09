
# HTML to JSON API Usage

This API allows you to convert any HTML webpage to a JSON tree structure representing the DOM.

## Endpoint

```
GET /api/convert?url=https://example.com
```

or

```
POST /api/convert
Content-Type: application/json

{
  "url": "https://example.com"
}
```

## Parameters

- `url`: The URL of the webpage you want to convert to JSON (required)

## Response Format

```json
{
  "success": true,
  "url": "https://example.com",
  "data": {
    "tagName": "html",
    "attributes": {
      "lang": "en"
    },
    "children": [
      // DOM tree structure
    ]
  }
}
```

## Error Handling

If an error occurs, the API will respond with:

```json
{
  "error": "Error message here"
}
```

## CORS

The API supports CORS and can be accessed from any origin.

## Rate Limiting

Please note that this API may have rate limiting in place to prevent abuse.

## Examples

### JavaScript Fetch

```javascript
// GET request
fetch('/api/convert?url=https://example.com')
  .then(response => response.json())
  .then(data => console.log(data));

// POST request
fetch('/api/convert', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ url: 'https://example.com' })
})
  .then(response => response.json())
  .then(data => console.log(data));
```

### cURL

```bash
# GET request
curl -X GET 'http://yourwebsite.com/api/convert?url=https://example.com'

# POST request
curl -X POST 'http://yourwebsite.com/api/convert' \
  -H 'Content-Type: application/json' \
  -d '{"url": "https://example.com"}'
```
