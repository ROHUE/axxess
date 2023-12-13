var http = require('http');
const url = require('url');
const querystring = require('querystring');
const curlFunction = require('./axxess_api/axxessAPI');
let sessionId = "";


const server = http.createServer((req, res) => {
    
    // Allow requests from your client origin
    res.setHeader('Access-Control-Allow-Origin', '*'); // Replace with your actual client origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
    // Respond to preflight request with OK status
    res.writeHead(200);
    res.end();
    return;
    }

    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });

    req.on('end', async () => {
        const { path, query } = url.parse(req.url);
        const queryParams = querystring.parse(query);
        const pathname = path.replace(/^\/services/, '');

        //console.log(req.url + ' **** ' + req.method) ;
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

        console.log('server: ' + JSON.stringify(body));


        // Endpoint for getSession
        if (req.method === 'POST' && pathname === '/getSession') {
            try {
                const credentials = { strUserName: 'JIY24', strPassword: '_x7#PC~Bd%J&s%v' };
                const { data, curlCall } = body;
                const result = await curlFunction(credentials, 'getSession');
                sessionId = result['strSessionId'];
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result));
            } catch (error) {
                console.error('Error:', error);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
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
                const result = await curlFunction(data, curlCall);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result));
            } catch (error) {
                console.error('Error:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
            }
        }

         // Endpoint to check telkom lte availability
         else if (req.method === 'POST' && pathname === '/checkTelkomLteAvailability') {
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

        // Endpoint to get list of network prividers
        else if (req.method === 'POST' && pathname === '/getNetworkProviders') {
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

        // Test endpoint
        else if (req.method === 'GET' && pathname === '/test') {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('This is a test endpoint for stuff!');
        }

        // 404 Not Found
        else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
        }
    });
});


server.listen(3000, () => {
    console.log('Listening to port 3000');
});

