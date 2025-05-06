import { nextTick, ref, toValue, watch, watchEffect, readonly, computed } from 'vue'
import { useFetchBackend } from './fetch.js'

export function useContentType() {
    const { data, error, loading, fetchData } = useFetchBackend()

    const load = async() => {
        await fetchData('content-type')
    }

    load()

    return {
        content_types: data,
        load
    }
}
