import { useFetchBackend } from './fetch.js'
import { watch, toRef } from 'vue'

export function useContentACL(content) {
    const { data, error, loading, fetchData } = useFetchBackend()
    const reactive_content = toRef(content)

    const load = async() => {
        await acl_fetchData(`${reactive_content.value.id}/acl`)
    }

    watch(reactive_content, () => load(), { immediate: true })

    return {
        acls: data
    }
}
