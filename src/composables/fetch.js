import { ref, toValue } from 'vue'

export class HTTPError extends Error {
    constructor(message, response) {
        super(message)
        this.name = 'HTTPError'
        this.response = response
    }
}

export function useFetchBackend() {
    const request_headers = new Headers({
        'accept': 'application/json'
    })
    const loading = ref(false)
    const data = ref(null)
    const response_headers = ref(null)
    const error = ref(null)

    const fetchData = async (url, options) => {
        loading.value = true
        error.value = false

        try {
            url = backend_url(toValue(url))
            const opts = {
                method: 'GET',
                headers: request_headers,
                ...options
            }

            const res = await fetch(url, opts)

            if (res.ok) {
                response_headers.value = res.headers,
                data.value = res.status == 204 ? null : await res.json()
                
                return { 
                    data: toValue(data),
                    error: toValue(error)
                }
            } else {
                throw new HTTPError(`HTTP error! Status: ${res.status}`, res);
            }
        }
        catch (e) {
            error.value = e
        } finally {
            loading.value = false
        }
    }

    return { data, loading, error, response_headers, fetchData }
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
