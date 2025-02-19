import { toValue } from 'vue'

export class HTTPError extends Error {
    constructor(message, response) {
        super(message)
        this.name = 'HTTPError'
        this.response = response
    }
}

export async function useFetchBackend(url, options) {
    const headers = new Headers({
        'accept': 'application/json'
    })

    const opts = {
        method: 'GET',
        headers: headers,
        ...options
    }

    url = backend_url(toValue(url))
    
    const res = await fetch(url, opts)

    if (res.ok) {
        return {
            headers: res.headers,
            data: res.status == 204 ? null : await res.json(),
        }
    } else {
        throw new HTTPError(`HTTP error! Status: ${res.status}`, res);
    }
}

export function backend_url(src, base) {
    if (base === undefined) {
        base = import.meta.env.VITE_BASE_BACKEND
    }

    try {
        src = src.toString()
        return src.startsWith('http') ? new URL(src) : new URL(src, base) 
    } catch(e) {
        return null
    }
}
