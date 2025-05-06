import { ref, computed, watch, watchEffect, toValue } from 'vue'
import { useFetchBackend } from './fetch.js'

export function useLineage(content) {
    const { data, error, fetchData } = useFetchBackend()

    const get_lineage = async () => {
        await fetchData(`${content.value.id}/lineage`)
    }

    watch(content, () => get_lineage(), { immediate: true })

    return {
        lineage: data,
        error,
        get_lineage
    }
}
