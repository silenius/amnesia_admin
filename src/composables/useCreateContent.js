import { ref, toValue } from 'vue'
import { content_as_formdata } from '../services/content.js'

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

    return {
        content
    }
}
