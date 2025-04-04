import { ref, toValue, watch, watchEffect, computed } from 'vue'
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

    const meta = ref({})

    const set_limit = (value) => {
        meta.value.offset = 0
        meta.value.limit = value
    }

    const set_offset = (value) => {
        meta.value.offset = value
    }
    
    const browse = async(opts={}) => {
        const options = new URLSearchParams({
            ...toValue(query),
            ...toValue(opts)
        })

        await fetchData(`${toValue(folder).id}/browse?${options}`)

        if (!toValue(error)) {
            result.value = toValue(data).data
            meta.value = toValue(data).meta
        }
    }

    await browse(meta)

    return {
        result,
        meta,
        set_limit,
        set_offset,
        error,
        browse,
        query
    }
}
