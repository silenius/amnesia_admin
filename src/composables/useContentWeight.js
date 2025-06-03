import { useFetchBackend } from './fetch.js'
import { toValue } from 'vue'

export function useContentWeight() {

    const set_weight = async(id, weight) => {
        const form_data = new FormData()
        form_data.append('weight', weight)

        const { error, data } = await useFetchBackend(`${id}/weight`, {
            method: 'POST',
            body: form_data
        })

        return { 
            data: data,
            error: error 
        }
    }

    return {
        set_weight
    }
}
