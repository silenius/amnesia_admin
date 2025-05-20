import { watch } from 'vue'
import { useFetchBackend } from './fetch.js'
import { useCreateContent } from './useContent.js'
import { file_as_formdata } from '../services/file.js'

export function useCreateFile() {
    const { content: file } = useCreateContent()

    const { data, error, fetchData } = useFetchBackend()

    const create_file = async(container) => {
        const form_data = file_as_formdata(file)

        await fetchData(`${container.id}/@@add_file`, {
            method: 'POST',
            body: form_data
        })
    }

    watch(data, () => file.value = data.value)

    return {
        file,
        create_file,
        error,
    }
}

export function useUpdateFile(file) {
    const { data, error, fetchData } = useFetchBackend()

    const update_file = async() => {
        const form_data = file_as_formdata(file)

        await fetchData(file.value.id, {
            method: 'PUT',
            body: form_data
        })
    }

    return {
        update_file,
        error
    }
}
