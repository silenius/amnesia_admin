import { ref } from 'vue'
import { useFetchBackend } from './fetch.js'

export function useFolderBrowser() {
    const { data, error, fetchData } = useFetchBackend()

    const offset = ref(0)
    const limit = ref(10)

    const browse = async(folder_id, opts={}) => {
        const options = new URLSearchParams(opts)
        return fetchData(`${folder}/browse?${options}`)
    }

    return {
        content: data,
        error,
        browse
    }
}
