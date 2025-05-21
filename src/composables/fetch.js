import { reactive, toValue, toRefs } from 'vue'

export class HTTPError extends Error {
    constructor(message, data) {
        super(message)
        this.name = 'HTTPError'
        this.data = data
    }
}

export function useFetchBackend(url, options) {
    const request_headers = new Headers({
        'accept': 'application/json'
    })
    
    const state = reactive({
        loading: false,
        data: null,
        error: null,
        status: null,
    })

    const fetchData = async (url, options) => {
        state.loading = true
        state.error = false

        try {
            url = backend_url(toValue(url))
            const opts = {
                method: 'GET',
                headers: request_headers,
                ...options
            }

            let body = null

            const res = await fetch(url, opts)

            state.status = res.status

            if (res.headers.get('content-type')?.includes('application/json')) { 
                body = await res.json()
            }

            if (res.ok) {
                state.data = body
            } else {
                state.data = null
                throw new HTTPError(`HTTP error (${res.statusText})`, body)
            }
        }
        catch (e) {
            state.error = e
        } finally {
            state.loading = false
        }

        return state
    }

    if (url) {
        return fetchData(url, options)
    }

    return { ...toRefs(state), fetchData }
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
