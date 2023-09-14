import { unref } from 'vue'
import { useFetchBackend } from '@/composables/fetch.js'

const event_to_formdata = (event_data) => {

    const event = unref(event_data)
    const data = new FormData()

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

    for (let key of fields) {
        if ((event[key] === null) || (event[key] === undefined)) {
            data.append(key, '')
        } else {
            data.append(key, event[key])
        }
    }

    if (event.acls) {
        data.append('acls', JSON.stringify(event.acls.map(x => {
            return {
                allow: x.allow,
                role_id: x.role.id,
                permission_id: x.permission.id
            }
        })))
    }

    if (event.banner_image) {
        data.append('banner_image', event.banner_image.id)
    }

    if (event.country) {
        data.append('country_iso', event.country.iso)
    }

    return data
}

const createEvent = async(container, event) => {
    const data = event_to_formdata(event)

    return useFetchBackend(`${container.id}/@@add_event`, {
        method: 'POST',
        body: data
    })
}

const updateEvent = async(event) => {
    const data = event_to_formdata(event)

    return useFetchBackend(`${event.id}`, {
        method: 'PUT',
        body: data
    })
}

export function useEvent() {
    return {
        updateEvent,
        createEvent
    }
}
