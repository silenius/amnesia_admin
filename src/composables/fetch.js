import { ref, isRef, unref, inject, watchEffect } from 'vue'

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
        return res.status == 204 ? res : await res.json()
    } else {
        throw new Error(`HTTP error! Status: ${res.status}`);
    }
}

export function backend_url(src) {
    const base = import.meta.env.VITE_BASE_BACKEND

    return src.startsWith('http') ? new URL(src) : new URL(src, base) 
}
