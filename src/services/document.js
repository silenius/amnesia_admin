import { toValue } from 'vue'
import { content_as_formdata } from './content.js'

export const document_as_formdata = (doc) => {
    const doc_value = toValue(doc)

    const fields = [
        'body'
    ]

    const form_data = content_as_formdata({content: doc, extra_fields: fields})

    return form_data
}

