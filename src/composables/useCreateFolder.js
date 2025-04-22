import { ref } from 'vue'
import { useFetchBackend } from './fetch.js'

export function useCreateFolder() {
    const folder = ref({
        is_fts: true,
        polymorphic_loading: false,
        exclude_nav: false,
        props: {}
    })

    const { data, error, fetchData } = useFetchBackend()

    const as_formdata = () => {
        const form_data = new FormData()

        const fields = [
            'title',
            'description',
            'exclude_nav',
            'is_fts',
            'effective',
            'expiration',
            'index_content_id',
            'polymorphic_loading',
            'default_limit',
        ]

        for (let key of fields) {
            const value = folder.value[key]

            if (value !== undefined) {
                form_data.append(key, value === null ? '' : value)
            } else {
                console.log('===> Skipping ', key)
            }
        }

        if (folder.value.polymorphic_loading 
            && folder.value.polymorphic_children) {
            folder.value.polymorphic_children.forEach(
                c => form_data.append('polymorphic_children_ids', c.id)
            )
        }

        if (folder.value.default_order) {
            form_data.append('default_order', JSON.stringify(folder.value.default_order))
        }

        if (folder.value.props) {
            form_data.append('props', JSON.stringify(folder.value.props))
        }

        if (folder.value.acls) {
            form_data.append('acls', JSON.stringify(folder.value.acls.map(x => {
                return {
                    allow: x.allow,
                    role_id: x.role.id,
                    permission_id: x.permission.id
                }
            })))
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

    return {
        folder,
        create_folder,
        error,
        data
    }
}
