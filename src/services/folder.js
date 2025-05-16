import { toValue } from 'vue'
import { content_as_formdata } from './content.js'
import { useFetchBackend } from '../composables/fetch.js'

export const folder_as_formdata = (folder) => {
    const folder_value = toValue(folder)

    const fields = [
        'exclude_nav',
        'index_content_id',
        'polymorphic_loading',
        'default_limit',
    ]

    const form_data = content_as_formdata({content: folder, extra_fields: fields})

    if (folder_value.polymorphic_loading 
        && folder_value.polymorphic_children) {
        folder_value.polymorphic_children.forEach(
            c => form_data.append('polymorphic_children_ids', c.id)
        )
    }

    if (folder_value.default_order) {
        form_data.append('default_order', JSON.stringify(folder_value.default_order))
    }

    return form_data
}

export async function get_orders (pl=false, pc=null) {
    const opts = new URLSearchParams()

    opts.append('pl', pl)

    if (Array.isArray(pc)) {
        pc.forEach((i) => opts.append('pc', i))
    }

    return useFetchBackend(`folder/polymorphic_orders?${opts}`)
}
