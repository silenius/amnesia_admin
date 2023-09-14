import { unref, } from 'vue'

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

    url = backend_url(url)
    
    const res = await fetch(unref(url), opts)

    if (res.ok) {
        return {
            headers: res.headers,
            data: res.status == 204 ? null : await res.json(),
        }
    } else {
        throw new HTTPError(`HTTP error! Status: ${res.status}`, res);
    }
}

export function backend_url(src) {
    const base = import.meta.env.VITE_BASE_BACKEND

    return src.startsWith('http') ? new URL(src) : new URL(src, base) 
}
