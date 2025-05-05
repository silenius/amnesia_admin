import { ref, computed, watch, toValue } from 'vue'
import { useFetchBackend } from './fetch.js'

export async function useLineage(content) {
    const { data, error, fetchData } = useFetchBackend()

    const get_lineage = async () => {
        const id = toValue(content).id
        console.log('===>>> GET LINEAGE ', id)
        await fetchData(`${id}/lineage`)
    }

    await get_lineage()
    watch(content, () => get_lineage())

    return {
        lineage: data,
        error,
        get_lineage
    }
}
