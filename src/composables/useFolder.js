import { useFetchBackend } from './fetch.js'
import { useBuildFolder } from './useContentBuilder.js'
import { watch, ref, toValue, computed, watchEffect } from 'vue'

export async function useFolder(folder_id) {
    const { data, error, loading, fetchData } = useFetchBackend()
    const { formatted: formatted_data } = useBuildFolder(data)

    const load = async (id=folder_id) => {
        await fetchData(`/folder/${toValue(id)}`)
    }

    await load(folder_id)
    watch(folder_id, async () => await load(folder_id))

    return {
        folder: formatted_data,
        load: load
    }
}
