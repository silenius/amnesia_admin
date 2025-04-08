import { useFetchBackend } from './fetch.js'
import { watch, ref, toValue, computed, watchEffect } from 'vue'

export async function useFolder(folder_id) {
    const { data, error, loading, fetchData } = useFetchBackend()

    const load = async (id=folder_id) => {
        await fetchData(toValue(id))
    }

    await load(folder_id)
    watch(folder_id, async () => await load(folder_id))

    return {
        folder: data,
        load: load
    }
}
