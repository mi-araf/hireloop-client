const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const serverFetch = async (path, options = {}) => {
    const res = await fetch(`${baseUrl}${path}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        ...options,
    });

    // handle 401, 404, 403 if needed

    return res.json();
}

export const serverMutation = async (path, data, options = {}) => {
    const res = await fetch(`${baseUrl}${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        ...options,
    });
    
    // handle 401, 404, 403

    return res.json();
}