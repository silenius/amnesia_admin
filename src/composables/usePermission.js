import { useFetchBackend } from './fetch.js'
import { ref } from 'vue'

export function usePermission() {
    const { data, error, loading, fetchData } = useFetchBackend()

    const load = async () => {
        await fetchData('permissions')
    }

    load()

    return {
        permissions: data
    }
}
