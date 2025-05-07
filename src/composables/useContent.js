import { useFetchBackend } from './fetch.js'
import { useBuildContent } from './useContentBuilder.js'
import { watch, toRef } from 'vue'

export function useContent(content_id) {
    const { data, error, loading, fetchData } = useFetchBackend()
    const { formatted: formatted_data } = useBuildContent(data)
    const reactive_content_id = toRef(content_id)

    const load = async () => {
        await fetchData(reactive_content_id.value)
    }

    watch(reactive_content_id, () => load(), { immediate: true })

    return {
        content: formatted_data,
        load,
    }
}
