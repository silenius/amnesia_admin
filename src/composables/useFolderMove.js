import { useFetchBackend } from './fetch.js'
import { toValue } from 'vue'

export function useFolderMove(folder) {
    console.log('FOLDER: ::: ', folder)
    const { data, error, loading, fetchData } = useFetchBackend()

    const paste = async (ids) => {
        const data = new FormData()

        toValue(ids).forEach((x) => data.append('ids', x))

        await fetchData(`folder/${toValue(folder).id}/paste`, {
            method: 'POST',
            body: data
        })
    }

    return {
        paste
    }
}
