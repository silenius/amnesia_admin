import { useFetchBackend } from '../composables/fetch.js'
import { as_id } from './utils.js'
import { toValue } from 'vue'

export function role_as_formdata(role) {
    const data = new FormData()
    const role_value = toValue(role)

    data.append('name', role_value.name)
    data.append('description', role_value.description)

    return data
}

export async function delete_role(role_or_id) {
    const id = as_id(role_or_id)

    if (id) {
        const { error } = await useFetchBackend(`roles/${id}`, {
            method: 'DELETE'
        })

        return !error
    }

    return false
}
