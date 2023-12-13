const http = require('http');
const url = require('url');
const querystring = require('querystring');
const curlFunction = require('./axxess_api/axxessAPI');

const port = 3000;
let sessionId = "";

const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  let body = '';

  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', async () => {
    const { pathname, query } = url.parse(req.url);
    const queryParams = querystring.parse(query);

    // Parse JSON if the content type is application/json
    if (req.headers['content-type'] === 'application/json') {
      try {
        body = JSON.parse(body);
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
        return;
      }
    }

    // Endpoint for getSession
    if (req.method === 'POST' && pathname === '/getSession') {
      try {
        const credentials = { strUserName: 'JIY24', strPassword: '_x7#PC~Bd%J&s%v' };
        const { data, curlCall } = body;
        const result = await curlFunction(credentials, curlCall);
        sessionId = result['strSessionId'];
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      } catch (error) {
        console.error('Error:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
      }
    }

    // Endpoint for checkSession
    else if (req.method === 'POST' && pathname === '/checkSession') {
      try {
        const { data, curlCall } = body;
        const result = await curlFunction(data, curlCall);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      } catch (error) {
        console.error('Error:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
      }
    }

    // Endpoint for getProvinces
    else if (req.method === 'POST' && pathname === '/getProvinces') {
      try {
        const { data, curlCall } = body;
        const result = await curlFunction(data, curlCall);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      } catch (error) {
        console.error('Error:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
      }
    }

    // Endpoint for getAllClients
    else if (req.method === 'POST' && pathname === '/getAllClients') {
      try {
        const { data, curlCall } = body;
        const result = await curlFunction(data, curlCall);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      } catch (error) {
        console.error('Error:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
      }
    }

    // Endpoint to check fibre availability
    else if (req.method === 'POST' && pathname === '/checkFibreAvailability') {
      try {
        const { data, curlCall } = body;
        console.log('server: ' + JSON.stringify(body));
        const result = await curlFunction(data, curlCall);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      } catch (error) {
        console.error('Error:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
      }
    }

    // Test endpoint
    else if (req.method === 'GET' && pathname === '/test') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('This is a test endpoint for stuff!');
    }

    // 404 Not Found
    else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not Found' }));
    }
  });
});

server.listen();
