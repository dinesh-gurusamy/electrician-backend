import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    // Handle CORS preflight requests
    if (event.request.method === 'OPTIONS') {
        return new Response(null, {
            headers: {
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                'Access-Control-Allow-Origin': 'http://100.75.52.82:3032/',
                'Access-Control-Allow-Headers': '*',
            }
        });
    }

    const response = await resolve(event);

    // Apply CORS headers to all other responses
    response.headers.append('Access-Control-Allow-Origin', 'http://100.75.52.82:3032/');
    response.headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    response.headers.append('Access-Control-Allow-Headers', '*');

    return response;
};
