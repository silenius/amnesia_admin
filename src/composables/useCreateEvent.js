import { ref, watch } from 'vue'
import { useFetchBackend } from './fetch.js'
import { useCreateContent } from './useCreateContent.js'

export function useCreateEvent() {
    const { content: event } = useCreateContent({
        starts: null,
        ends: null,
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
            'breadcrumb',
            'body',
            'starts',
            'ends',
            'address',
            'address_latitude',
            'address_longitude'
        ]

        for (const key of fields) {
            const value = event.value[key]

            if (value !== undefined) {
                form_data.append(key, value === null ? '' : value)
            } else {
                console.log('===> Skipping ', key)
            }
        }

        if (event.value.country) {
            form_data.append('country_iso', event.value.country.iso)
        }

        if (event.value.props) {
            form_data.append('props', JSON.stringify(event.value.props))
        }

        if (event.value.acls) {
            form_data.append('acls', JSON.stringify(event.value.acls.map(x => {
                return {
                    allow: x.allow,
                    role_id: x.role.id,
                    permission_id: x.permission.id
                }
            })))
        }

        return form_data
    }

    const create_event = async(container) => {
        const form_data = as_formdata(event)

        await fetchData(`${container.id}/@@add_event`, {
            method: 'POST',
            body: form_data
        })
    }

    watch(data, () => event.value = data.value)

    return {
        event,
        create_event,
        error,
    }
}
