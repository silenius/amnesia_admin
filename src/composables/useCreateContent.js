import { ref, toValue } from 'vue'

export function useCreateContent(fields) {
    const content = ref({
        title: '',
        is_fts: true,
        effective: null,
        expiration: null,
        props: {},
        acls: [],
        ...fields
    })

    const as_formdata = ({form_data, extra_fields=[]} = {}) => {
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
            const value = content.value[key]

            if (value !== undefined) {
                form_data.append(key, value === null ? '' : value)
            } else {
                console.log('===> Skipping ', key)
            }
        }

        if (content.value.props) {
            form_data.append('props', JSON.stringify(content.value.props))
        }

        if (content.value.acls) {
            form_data.append('acls', JSON.stringify(content.value.acls.map(x => {
                return {
                    allow: x.allow,
                    role_id: x.role.id,
                    permission_id: x.permission.id
                }
            })))
        }

        return form_data
    }

    return {
        content,
        as_formdata
    }

}
