import { ref, watch, toRef } from 'vue'
import { useFetchBackend } from './fetch.js'
import { useBuildContent } from './useContentBuilder.js'
import { content_as_formdata } from '../services/content.js'

export function useContent(content_id) {
    const { data, error, loading, fetchData } = useFetchBackend()
    const { formatted: formatted_data } = useBuildContent(data)
    const reactive_content_id = toRef(content_id)

    const load = async () => {
        await fetchData(reactive_content_id.value)
    }

    watch(reactive_content_id, () => load(), { immediate: true })

    return {
        content: formatted_data,
        load,
    }
}

export function useCreateContent(fields) {
    const content = ref({
        title: '',
        is_fts: true,
        effective: null,
        expiration: null,
        props: {},
        acls: [],
        ...fields
    })

    return {
        content
    }
}

export function useContentDelete() {
    const destroy = async(id) => {
        const { error } = await useFetchBackend(id, {
            method: 'DELETE'
        })

        return !error
    }

    return {
        destroy
    }
}
