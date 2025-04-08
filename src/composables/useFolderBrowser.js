import { nextTick, ref, toValue, watch, watchEffect, readonly, computed } from 'vue'
import { useFetchBackend } from './fetch.js'
import { useFolder } from './useFolder.js'

export async function useFolderBrowser(folder, opts={}) {
    const { data, error, loading, fetchData } = useFetchBackend()

    const result = ref([])

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

        const options = new URLSearchParams(toValue(query))
        await fetchData(`${toValue(folder).id}/browse?${options}`)

        if (!toValue(error)) {
            result.value = toValue(data).data
            meta.value = toValue(data).meta
        }
    }

    const goto_page = (page) => {
        return browse({
            offset: (page - 1) * toValue(meta).limit
        })
    }

    await browse(query)
    watch(folder, async () => {
        query.value.offset = 0
        await browse(query)
    })

    return {
        result: readonly(result),
        meta: readonly(meta),
        error,
        browse,
        query,
        goto_page
    }
}
