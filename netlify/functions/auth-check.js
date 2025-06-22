exports.handler = async (event, context) => {
    // Get the user from Netlify Identity
    const { user } = context.clientContext || {}

    // Check if user is authenticated
    if (!user) {
        return {
            statusCode: 401,
            body: JSON.stringify({
                error: 'Authentication required',
                message: 'Please sign in to access the admin panel'
            })
        }
    }

    // Check if user has admin role
    const userRoles = user.app_metadata?.roles || []
    const isAdmin = userRoles.includes('admin')

    if (!isAdmin) {
        return {
            statusCode: 403,
            body: JSON.stringify({
                error: 'Access denied',
                message: 'Admin privileges required'
            })
        }
    }

    // User is authenticated and has admin role
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Access granted',
            user: {
                id: user.id,
                email: user.email,
                roles: userRoles
            }
        })
    }
} 