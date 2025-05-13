import { toValue } from 'vue'
import { useFetchBackend } from '../composables/fetch.js'

export const content_as_formdata = ({content, form_data, extra_fields=[]} = {}) => {
    const content_value = toValue(content)

    if (!form_data) {
        form_data = new FormData()
    }

    const fields = [
        'title',
        'description',
        'effective',
        'expiration',
        'is_fts',
        ...extra_fields
    ]

    for (const key of fields) {
        const value = content_value[key]

        if (value !== undefined) {
            form_data.append(key, value === null ? '' : value)
        } else {
            console.log('===> Skipping ', key)
        }
    }

    if (content_value.props) {
        form_data.append('props', JSON.stringify(content_value.props))
    }

    if (content_value.acls) {
        form_data.append('acls', JSON.stringify(content_value.acls.map(x => {
            return {
                allow: x.allow,
                role_id: x.role.id,
                permission_id: x.permission.id
            }
        })))
    }

    return form_data
}

export const publish = async(id) => {
    const { fetchData } = useFetchBackend()
    await fetchData(`${toValue(id)}/publish`, {method: 'POST'})
}

export const unpublish = async(id) => {
    const { fetchData } = useFetchBackend()
    await fetchData(`${toValue(id)}/unpublish`, {method: 'POST'})
}
