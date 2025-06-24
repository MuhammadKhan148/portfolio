// Using built-in fetch (available in Node.js 18+)

exports.handler = async (event, context) => {
    console.log('GitHub webhook received');

    // Only handle POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        // Parse the webhook payload
        const payload = JSON.parse(event.body);
        const eventType = event.headers['x-github-event'];

        console.log('Event type:', eventType);
        console.log('Repository:', payload.repository?.name);

        // Only handle push events and repository events
        if (eventType !== 'push' && eventType !== 'repository') {
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Event type not handled' })
            };
        }

        // Trigger a new build
        const buildHookUrl = process.env.NETLIFY_BUILD_HOOK;
        if (buildHookUrl) {
            console.log('Triggering new build...');

            const buildResponse = await fetch(buildHookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    trigger_title: `GitHub Push: ${payload.repository?.name || 'Unknown repo'}`,
                    trigger_branch: payload.ref?.replace('refs/heads/', '') || 'main'
                })
            });

            if (buildResponse.ok) {
                console.log('Build triggered successfully');
                return {
                    statusCode: 200,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        message: 'Build triggered successfully',
                        repository: payload.repository?.name,
                        event: eventType
                    })
                };
            } else {
                console.error('Failed to trigger build:', buildResponse.status);
                return {
                    statusCode: 500,
                    body: JSON.stringify({ error: 'Failed to trigger build' })
                };
            }
        } else {
            console.log('No build hook configured');
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'Webhook received but no build hook configured',
                    repository: payload.repository?.name,
                    event: eventType
                })
            };
        }

    } catch (error) {
        console.error('Webhook error:', error);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                error: 'Internal server error',
                message: error.message
            })
        };
    }
}; 