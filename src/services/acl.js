import { toValue } from 'vue'
import { useFetchBackend } from '../composables/fetch.js'

export function get_recursive_acls(content_or_id) {
    const v = toValue(content_or_id)
    const id = isNaN(parseInt(v)) ? v.id : v
    
    return useFetch(`${id}/acls`)
}
