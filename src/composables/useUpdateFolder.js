import { ref, watch, toValue } from 'vue'
import { useFetchBackend } from './fetch.js'
import { folder_as_formdata } from '../services/folder.js'

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
