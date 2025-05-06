import { ref, toValue, watch, watchEffect, readonly, computed } from 'vue'
import { useFetchBackend } from './fetch.js'
import { useFolder } from './useFolder.js'

export function useFolderBrowser(folder, opts={}) {
    const { data, error, loading, fetchData } = useFetchBackend()

    const result = ref([])
    const view = ref('tabular')

    // metadata sets on *client* side
    const query = ref({
        offset: 0,
        limit: 10,
        ...opts
    })

    // metadata returned by *server* side
    const meta = ref({})

    const browse = async(opts={}) => {
        if (toValue(opts)) {
            query.value = { 
                ...query.value, 
                ...toValue(opts)
            }
        }

        const qs = new URLSearchParams()

        Object.entries(query.value).forEach(
            ([key, value]) => Array.isArray(value) 
                // p: ['foo', 'bar'] => p=foo&p=bar
                ? value.forEach(v => qs.append(key, v)) 
                // p: somevalue => p=somevalue
                : qs.append(key, value)
        )

        await fetchData(`${folder.value.id}/browse?${qs}`)

        if (!toValue(error)) {
            result.value = toValue(data).data
            meta.value = toValue(data).meta
        }
    }

    const goto_page = (page) => browse({
        offset: (page - 1) * toValue(meta).limit
    })

    const change_limit = (limit) => browse({
        offset: 0,
        limit: limit
    })

    watch(folder, () => {
        query.value.offset = 0
        if (folder.value) {
            browse(query)
        }
    }, {immediate: true})

    return {
        result: readonly(result),
        meta: readonly(meta),
        error,
        browse,
        query,
        goto_page,
        change_limit,
        view
    }
}
