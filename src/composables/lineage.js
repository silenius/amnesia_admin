import { ref, computed, watch, toValue } from 'vue'
import { useFetchBackend } from './fetch.js'

export async function useLineage(content) {
    const { data, error, fetchData } = useFetchBackend()

    const get_lineage = async () => {
        const id = toValue(content).id
        await fetchData(`${id}/lineage`)
    }

    await get_lineage(content)
    watch(content, async() => await get_lineage(content))

    return {
        lineage: data,
        error,
        get_lineage
    }
}
