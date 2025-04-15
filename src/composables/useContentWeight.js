import { useFetchBackend } from './fetch.js'
import { toValue } from 'vue'

export function useContentWeight() {

    const set_weight = async(id, weight) => {
        const { data, error, fetchData } = useFetchBackend()
        const form_data = new FormData()
        form_data.append('weight', weight)

        await fetchData(`${id}/weight`, {
            method: 'POST',
            body: form_data
        })

        return { 
            data: toValue(data),
            error: toValue(error) 
        }
    }

    return {
        set_weight
    }
}
