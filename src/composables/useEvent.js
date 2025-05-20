import { ref, watch } from 'vue'
import { useFetchBackend } from './fetch.js'
import { useCreateContent } from './useContent.js'
import { event_as_formdata } from '../services/event.js'

export function useCreateEvent() {
    const { content: event } = useCreateContent({
        starts: null,
        ends: null,
    })

    const { data, error, fetchData } = useFetchBackend()

    const create_event = async(container) => {
        const form_data = event_as_formdata(event)

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

export function useUpdateEvent(event) {
    const { data, error, fetchData } = useFetchBackend()

    const update_event = async() => {
        const form_data = event_as_formdata(event)

        await fetchData(event.value.id, {
            method: 'PUT',
            body: form_data
        })
    }

    return {
        update_event,
        error
    }
}


