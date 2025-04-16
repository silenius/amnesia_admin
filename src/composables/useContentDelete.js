import { toValue } from 'vue'
import { useFetchBackend } from './fetch.js'

export function useContentDelete() {
    
    const destroy = async (id) => {
        const { error, data, fetchData } = useFetchBackend()

        await fetchData(id, {
            method: 'DELETE'
        })

        return !toValue(error)
    }

    return {
        destroy
    }

}
