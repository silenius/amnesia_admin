import { ref, computed, toValue, toRef } from 'vue'
import { asURLSearchParams } from '../services/url.js'
import { useFetchBackend } from './fetch.js'

export function useBrowser(url, opts) {
    const { data, error, loading, fetchData } = useFetchBackend()
    const reactive_url = toRef(url)

    // folder content
    const result = computed(() => data.value?.data || [])

    // metadata returned by *server* side
    const meta = computed(() => data.value?.meta || {})

    // metadata sets on *client* side
    const query = ref({
        offset: 0,
        limit: 10,
        ...opts
    })

    const browse = (opts) => {
        const opts_value = toValue(opts)
        
        if (opts_value) {
            query.value = { 
                ...query.value, 
                ...opts_value
            }
        }

        const qs = asURLSearchParams(query.value)

        fetchData(`${reactive_url.value}?${qs}`)
    }

    const goto_page = (page) => browse({
        offset: (page - 1) * meta.value.limit
    })

    const change_limit = (limit) => browse({
        offset: 0,
        limit: limit
    })

    return {
        result,
        error,
        meta,
        query,
        browse,
        goto_page,
        change_limit
    }
}
