import { useFetchBackend } from './fetch.js'
import { useBuildContent } from './useContentBuilder.js'
import { watch, ref, toValue, computed, watchEffect } from 'vue'

export async function useContent(content_id) {
    const { data, error, loading, fetchData } = useFetchBackend()
    const { formatted: formatted_data } = useBuildContent(data)

    const load = (id=content_id) => fetchData(toValue(id))

    await load(content_id)
    watch(content_id, () => load(content_id))

    return {
        content: formatted_data,
        load: load
    }
}
