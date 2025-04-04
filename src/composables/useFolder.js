import { useFetchBackend } from './fetch.js'
import { watch, ref, toRef, toValue, computed, watchEffect } from 'vue'

export async function useFolder(folder_id) {
    const { data, error, loading, fetchData } = useFetchBackend()

    const load = async (id=folder_id) => {
        await fetchData(id)
    }

    await load()

    return {
        folder: data,
        load: load
    }
}
