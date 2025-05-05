import { ref, watch, toValue } from 'vue'
import { useFetchBackend } from './fetch.js'
import { useCreateContent } from './useCreateContent.js'

export function useCreateFolder() {
    const { content: folder, as_formdata: as_formdata_content } = useCreateContent({
        polymorphic_loading: false,
        exclude_nav: false,
    })

    const { data, error, fetchData } = useFetchBackend()

    const as_formdata = () => {
        const fields = [
            'exclude_nav',
            'index_content_id',
            'polymorphic_loading',
            'default_limit',
        ]

        const form_data = as_formdata_content({extra_fields: fields})

        if (folder.value.polymorphic_loading 
            && folder.value.polymorphic_children) {
            folder.value.polymorphic_children.forEach(
                c => form_data.append('polymorphic_children_ids', c.id)
            )
        }

        if (folder.value.default_order) {
            form_data.append('default_order', JSON.stringify(folder.value.default_order))
        }

        return form_data
    }

    const create_folder = async(container) => {
        const form_data = as_formdata(folder)

        await fetchData(`${container.id}/@@add_folder`, {
            method: 'POST',
            body: form_data
        })
    }

    watch(data, () => folder.value = data.value)

    return {
        folder,
        create_folder,
        error
    }
}
