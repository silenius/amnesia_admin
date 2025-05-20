import { reactive, toValue, toRefs } from 'vue'

export class HTTPError extends Error {
    constructor({message, data, status}) {
        super(message)
        this.name = 'HTTPError'
        this.data = data
        this.status = status
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

            const res = await fetch(url, opts)

//            if (res.headers.get('content-type')?.includes('application/json')) { }

            if (res.ok) {
                state.data = res.status == 204 ? null : await res.json()
                state.status = res.status
            } else {
                throw new HTTPError({
                    message: `HTTP error (${res.status})`,
                    data: await res.json(),
                    status: res.status
                })
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
