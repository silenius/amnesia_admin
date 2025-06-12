import { toValue } from 'vue'
import { useFetchBackend } from '../composables/fetch.js'
import { as_id } from './utils'

export function get_recursive_acls(content_or_id) {
    const id = as_id(content_or_id)    
    return useFetchBackend(`${id}/acls`)
}
