import { nextTick, ref, toValue, watch, watchEffect, readonly, computed } from 'vue'
import { useFetchBackend } from './fetch.js'

export async function useContentType() {
    const { data, error, loading, fetchData } = useFetchBackend()

    const load = async() => {
        await fetchData('content-type')
    }

    await load()

    return {
        content_types: data,
        load
    }
}
