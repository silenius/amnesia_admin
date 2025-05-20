import { toValue } from 'vue'
import { content_as_formdata } from './content.js'

export const event_as_formdata = (event) => {
    const event_value = toValue(event)

    const fields = [
        'body',
        'starts',
        'ends',
        'address',
        'address_latitude',
        'address_longitude'
    ]

    const form_data = content_as_formdata({content: event, extra_fields: fields})

    if (event_value.country) {
        form_data.append('country_iso', event_value.country.iso)
    }

    return form_data
}
