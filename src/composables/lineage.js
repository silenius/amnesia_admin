import { ref } from 'vue'
import { useFetchBackend } from './fetch.js'

export function useLineage() {
    const { data, error, fetchData } = useFetchBackend()

    const get_lineage = async (content_id) => {
        return fetchData(`${content_id}/lineage`)
    }

    return {
        lineage: data,
        error,
        get_lineage
    }
}
