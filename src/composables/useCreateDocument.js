import { ref, watch } from 'vue'
import { useFetchBackend } from './fetch.js'
import { useCreateContent } from './useCreateContent.js'

export function useCreateDocument() {
    const { 
        content: doc,
        as_formdata: as_formdata_content
    } = useCreateContent({
        body: "<p>Document content</p>"
    })

    const { data, error, fetchData } = useFetchBackend()

    const as_formdata = () => {
        const fields = [ 'body' ]
        const form_data = as_formdata_content({extra_fields: fields})
        return form_data
    }

    const create_document = async(container) => {
        const form_data = as_formdata(doc)

        await fetchData(`${container.id}/@@add_document`, {
            method: 'POST',
            body: form_data
        })
    }

    watch(data, () => doc.value = data.value)

    return {
        doc,
        create_document,
        error,
    }
}
