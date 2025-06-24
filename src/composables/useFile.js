import { ref, watch } from 'vue'
import { useFetchBackend } from './fetch.js'
import { useCreateContent } from './useContent.js'
import { create_file, update_file } from '../services/file.js'

export function useCreateFile(fields) {
    const { content: file } = useCreateContent(fields)
    const error = ref()

    const create = async (container) => {
        const { data, f_error: error } = await create_file(container, file)
        
        if (!error) {
            file.value = data
        } else {
            error.value = f_error
        }
    }

    return {
        file,
        create,
        error,
    }
}

export function useUpdateFile(file) {
    const error = ref()

    const update = async() => {
        const { data, f_error: error } = await update_file(file)
        
        if (!error) {
            file.value = data
        } else {
            error.value = f_error
        }
    }

    return {
        update,
        error
    }
}
