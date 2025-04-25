import { ref } from 'vue'
import { useFetchBackend } from './fetch.js'

export function useCreateDocument() {
    const doc = ref({
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
            'body'
        ]

        for (let key of fields) {
            const value = doc.value[key]

            if (value !== undefined) {
                form_data.append(key, value === null ? '' : value)
            } else {
                console.log('===> Skipping ', key)
            }
        }

        if (doc.value.props) {
            form_data.append('props', JSON.stringify(doc.value.props))
        }

        if (doc.value.acls) {
            form_data.append('acls', JSON.stringify(doc.value.acls.map(x => {
                return {
                    allow: x.allow,
                    role_id: x.role.id,
                    permission_id: x.permission.id
                }
            })))
        }

        return form_data
    }

    const create_document = async(container) => {
        const form_data = as_formdata(doc)

        await fetchData(`${container.id}/@@add_document`, {
            method: 'POST',
            body: form_data
        })
    }

    return {
        doc,
        create_document,
        error,
        data
    }
}
