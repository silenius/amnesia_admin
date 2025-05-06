import { ref, watch } from 'vue'
import { useFetchBackend } from './fetch.js'
import { useCreateContent } from './useCreateContent.js'
import { document_as_formdata } from '../services/document.js'

export function useCreateDocument() {
    const { content: doc, } = useCreateContent({
        body: "<p>Document content</p>"
    })

    const { data, error, fetchData } = useFetchBackend()

    const create_document = async(container) => {
        const form_data = document_as_formdata(doc)

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
