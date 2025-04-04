import { ref, toValue, watch, watchEffect, readonly, computed } from 'vue'
import { useFetchBackend } from './fetch.js'
import { useFolder } from './useFolder.js'

export async function useFolderBrowser(folder, opts={}) {
    const { data, error, loading, fetchData } = useFetchBackend()

    const result = ref([])
    const query = ref({
        offset: 0,
        limit: 10,
        ...opts
    })

    // metadata returned by *server* side
    const meta = ref({})

    const browse = async(opts={}) => {
        console.log('BEGIN BROWSE')
        query.value = { 
            ...query.value, ...toValue(opts)
        }

        const options = new URLSearchParams(toValue(query))
        await fetchData(`${toValue(folder).id}/browse?${options}`)

        if (!toValue(error)) {
            result.value = toValue(data).data
            meta.value = toValue(data).meta
        }
        console.log('END BROWSE')
    }

    const goto_page = (page) => {
        return browse({
            offset: (page - 1) * toValue(meta).limit
        })
    }

    console.log('BEFORE AWAIT')
    await browse(query)
    console.log('AFTER AWAIT')

    watch(folder, async () => browse(query))

    return {
        result: readonly(result),
        meta: readonly(meta),
        error,
        browse,
        query,
        goto_page
    }
}
