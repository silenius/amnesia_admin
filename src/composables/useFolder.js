import { useFetchBackend } from './fetch.js'
import { useBuildFolder } from './useContentBuilder.js'
import { watch, ref, toRef, toValue, computed, watchEffect } from 'vue'
import { useCreateContent } from './useContent.js'
import { folder_as_formdata } from '../services/folder.js'

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

export function useCreateFolder() {
    const { content: folder } = useCreateContent({
        polymorphic_loading: false,
        exclude_nav: false,
    })

    const { data, error, fetchData } = useFetchBackend()

    const create_folder = async(container) => {
        const form_data = folder_as_formdata(folder)

        await fetchData(`${container.id}/@@add_folder`, {
            method: 'POST',
            body: form_data
        })
    }

    watch(data, () => folder.value = data.value)

    return {
        folder,
        create_folder,
        error
    }
}

export function useUpdateFolder(folder) {
    const { data, error, fetchData } = useFetchBackend()

    const update_folder = async() => {
        const form_data = folder_as_formdata(folder)

        await fetchData(folder.value.id, {
            method: 'PUT',
            body: form_data
        })
    }

    return {
        update_folder,
        error
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
