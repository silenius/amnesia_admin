import { toValue } from 'vue'
import { content_as_formdata } from './content.js'
import { useFetchBackend } from '../composables/fetch.js'
import { as_id } from './utils.js'

export const file_as_formdata = (file) => {
    const file_value = toValue(file)

    const fields = [
        'content'
    ]

    const form_data = content_as_formdata({content: file, extra_fields: fields})

    return form_data
}

export function create_file(container, file) {
    const container_id = as_id(container)
    const form_data = file_as_formdata(file)
    
    return useFetchBackend(`${container_id}/@@add_file`, {
        method: 'POST',
        body: form_data
    })
}

export function update_file(file) {
    const form_data = file_as_formdata(file)
    const file_id = as_id(file)
    
    return useFetchBackend(file_id, {
        method: 'PUT',
        body: form_data
    })
}
