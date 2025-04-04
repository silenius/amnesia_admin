import { useFetchBackend } from './fetch.js'
import { watch, ref, toRef, toValue, computed, watchEffect } from 'vue'

export async function useFolder(folder_id) {
    const { data, error, loading, fetchData } = useFetchBackend()

    const load = async () => {
        await fetchData(folder_id)
    }

    await load()

    return {
        folder: data
    }
}
