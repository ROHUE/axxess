const https = require('https');
const querystring = require('querystring');

async function curlFunction(d, curlcall) {
    const baseUrl = 'https://apitest.axxess.co.za/calls/rsapi/';
    const username = 'ResellerAdmin';
    const password = 'jFbd5lg7Djfbn48idmlf4Kd';
    const authHeader = Buffer.from(`${username}:${password}`).toString('base64');
    const headers = {
        'Authorization': `Basic ${authHeader}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };
    try {
        let response;
        const params = querystring.stringify(d);
        const options = {
            headers,
            method: 'GET', // Default to GET, change as needed for other methods
        };
        const postOptions = {
            headers,
            method: 'POST', // Default to GET, change as needed for other methods
        }
        switch (curlcall) {
            case 'getSession':
                response = await makeRequest(`${baseUrl}getSession.json?${params}`, options);
                break;

            case 'checkSession':
                response = await makeRequest(`${baseUrl}checkSession.json?${params}`, options);
                break;

            case 'getProvinces':
                response = await makeRequest(`${baseUrl}getProvinces.json?${params}`, options);
                break;

            case 'getAllClients':
                response = await makeRequest(`${baseUrl}getAllClients.json?${params}`, options);
                break;

            case 'getClientById':
                response = await makeRequest(`${baseUrl}getClientById.json?${params}`, options);
                break;

            case 'createClient':
                options.method = 'PUT';
                response = await makeRequest(`${baseUrl}createClient.json`, { ...options, body: JSON.stringify(d) });
                break;

            case 'getProducts':
                response = await makeRequest(`${baseUrl}getProducts.json?${params}`, options);
                break;

            case 'getServicesByClient':
                response = await makeRequest(`${baseUrl}getServicesByClient.json?${params}`, options);
                break;

            case 'getAllUnassignedSimServices':
                response = await makeRequest(`${baseUrl}getAllUnassignedSimServices.json?${params}`, options);
                break;

            case 'getServiceSessionDetailsById':
                response = await makeRequest(`${baseUrl}getServiceSessionDetailsById.json?${params}`, options);
                break;

            case 'getServiceUsageDetailsById':
                response = await makeRequest(`${baseUrl}getServiceUsageDetailsById.json?${params}`, options);
                break;

            case 'createService':
                options.method = 'PUT';
                response = await makeRequest(`${baseUrl}createService.json`, { ...options, body: JSON.stringify(d) });
                break;

            case 'funcServiceChanges':
                options.method = 'PUT';
                response = await makeRequest(`${baseUrl}funcServiceChanges.json`, { ...options, body: JSON.stringify(d) });
                break;

            case 'funcTopups':
                options.method = 'PUT';
                response = await makeRequest(`${baseUrl}funcTopups.json`, { ...options, body: JSON.stringify(d) });
                break;

            case 'funcPod':
                response = await makeRequest(`${baseUrl}funcPod.json?${params}`, options);
                break;

            case 'funcSuspend':
                response = await makeRequest(`${baseUrl}funcSuspend.json?${params}`, options);
                break;

            case 'funcFixLine':
                response = await makeRequest(`${baseUrl}funcFixLine.json?${params}`, options);
                break;

            case 'funcCheckLine':
                response = await makeRequest(`${baseUrl}funcCheckLine.json?${params}`, options);
                break;

            case 'funcPasswordReset':
                response = await makeRequest(`${baseUrl}funcPasswordReset.json?${params}`, options);
                break;

            case 'checkFibreAvailability':
                response = await makeRequest(`${baseUrl}checkFibreAvailability.json?${params}`, options);
                break;

            case 'checkTelkomLteAvailability':
                response = await makeRequest(`${baseUrl}checkTelkomLteAvailability.json?${params}`, postOptions);
                break;

            case 'getNetworkProviders':
                response = await makeRequest(`${baseUrl}getNetworkProviders.json?${params}`, options);
                break;

            case 'getNetworkProviderProducts':
                // Handle multiple requests for each guidNetworkProviderId
                const productsPromises = d.guidNetworkProviderIds.map(providerIdObj => {
                    const providerId = providerIdObj.guidNetworkProviderId;
                    const providerParams = { ...d, guidNetworkProviderIds: [{ ...providerIdObj }] };
                    const providerParamsString = querystring.stringify(providerParams);
                    const url = `${baseUrl}getNetworkProviderProducts.json?${providerParamsString}`;
                    return makeRequest(url, options);
                });

                // Wait for all requests to complete
                response = await Promise.all(productsPromises);
                break;


            case 'createFibreComboService':
                options.method = 'PUT';
                response = await makeRequest(`${baseUrl}createFibreComboService.json`, { ...options, body: JSON.stringify(d) });
                break;

            default:
                throw new Error('Invalid curlcall parameter');
        }

        return response;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

function makeRequest(url, options) {
    return new Promise((resolve, reject) => {
        const req = https.request(url, options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve(data);
                } else {
                    console.error(`Request failed with status code ${res.statusCode}`);
                    console.error(data); // Log the response data
                    reject(new Error(`Request failed with status code ${res.statusCode}`));
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        if (options.body) {
            req.write(options.body);
        }

        req.end();
    });
}

module.exports = curlFunction;