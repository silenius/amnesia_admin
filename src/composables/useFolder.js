import { useFetchBackend } from './fetch.js'
import { useBuildFolder } from './useContentBuilder.js'
import { watch, ref, toRef, toValue, computed, watchEffect } from 'vue'

export function useFolder(folder_id) {
    const { data, error, loading, fetchData } = useFetchBackend()
    const { formatted: formatted_data } = useBuildFolder(data)
    const reactive_folder_id = toRef(folder_id)

    const load = async () => {
        await fetchData(`folder/${reactive_folder_id.value}`)
    }

    watch(reactive_folder_id, () => load(), {immediate: true})

    return {
        folder: formatted_data,
        load: load
    }
}

export function useMediaFolder() {
    const { data, error, loading, fetchData } = useFetchBackend()
    const { formatted: formatted_data } = useBuildFolder(data)

    const load_media_folder = async () => {
        await fetchData('folder/default_media')
    }

    load_media_folder()

    return {
        media_folder: formatted_data    
    }
}

export async function get_orders (pl=false, pc=null) {
    const opts = new URLSearchParams()
    const { data, error, fetchData } = useFetchBackend()

    opts.append('pl', pl)

    if (Array.isArray(pc)) {
        pc.forEach((i) => opts.append('pc', i))
    }

    await fetchData(`folder/polymorphic_orders?${opts}`)

    if (!toValue(error)) {
        return toValue(data)
    }
}
