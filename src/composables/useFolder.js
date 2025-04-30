import { useFetchBackend } from './fetch.js'
import { useBuildFolder } from './useContentBuilder.js'
import { watch, ref, toValue, computed, watchEffect } from 'vue'

export async function useFolder(folder_id) {
    const { data, error, loading, fetchData } = useFetchBackend()
    const { formatted: formatted_data } = useBuildFolder(data)

    const load = (id=folder_id) => fetchData(`folder/${toValue(id)}`)

    await load(folder_id)
    watch(folder_id, () => load(folder_id))

    return {
        folder: formatted_data,
        load: load
    }
}

export async function useMediaFolder() {
    const { data, error, loading, fetchData } = useFetchBackend()
    const { formatted: formatted_data } = useBuildFolder(data)

    const load_media_folder = async () => {
        await fetchData('folder/default_media')
    }

    await load_media_folder()

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
