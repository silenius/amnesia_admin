import { ref, isRef, unref, inject, watchEffect } from 'vue'
import { backend_url } from '@/symbols.js'

export function useFetch(url, options) {
    const data = ref(null)
    const error = ref(null)

    async function doFetch() {
        data.value = null
        error.value = null

        try {
            const res = await fetch(unref(url), options)
            data.value = await res.json()
        } catch (e) {
            error.value = e
        }
    }

    if (isRef(url)) {
        watchEffect(doFetch)
    } else {
        doFetch()
    }

    return { data, error, retry: doFetch }
}

export function useFetchBackend(url) {
    const headers = new Headers({
        'accept': 'application/json'
    })

    const options = {
        method: 'GET',
        headers: headers
    }

    if (!url.startsWith('http')) {
        url = new URL(url, inject(backend_url))
    } else {
        url = new URL(url)
    }

    return useFetch(url, options)
}

