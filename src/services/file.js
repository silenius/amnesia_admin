import { toValue } from 'vue'
import { content_as_formdata } from './content.js'

export const file_as_formdata = (file) => {
    const file_value = toValue(file)

    const fields = [
        'content'
    ]

    const form_data = content_as_formdata({content: file, extra_fields: fields})

    return form_data
}
