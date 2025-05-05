import { ref, watch } from 'vue'
import { useFetchBackend } from './fetch.js'
import { useCreateContent } from './useCreateContent.js'

export function useCreateEvent() {
    const { content: event, as_formdata: as_formdata_content } = useCreateContent({
        starts: null,
        ends: null,
    })

    const { data, error, fetchData } = useFetchBackend()

    const as_formdata = () => {
        const fields = [
            'body',
            'starts',
            'ends',
            'address',
            'address_latitude',
            'address_longitude'
        ]

        const form_data = as_formdata_content({extra_fields: fields})

        if (event.value.country) {
            form_data.append('country_iso', event.value.country.iso)
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
