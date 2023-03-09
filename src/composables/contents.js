import { useFetchBackend } from '@/composables/fetch.js'
import { ref, readonly } from 'vue';
import { useValidators } from '@/composables/validators.js'

const content = ref({})

const { isEmpty, minLength } = useValidators()

const getContent = async (id) => {
    const res = await useFetchBackend(`${id}`)
    content.value = res
}

const getContentACL = async () => {
    const res = await useFetchBackend(`${content.value.id}/acl`)
    content.value.acls = res
}

const destroyContent = async (id) => {
    await useFetchBackend(`${id}`, {
        method: 'DELETE'
    })
}

const validateTitle = (value) => {
    return !value ? isEmpty('title', value) : minLength('title', value, 4)
}

const validateDescription = (value) => {
    return false
}


export function useContent() {
    return {
        content: content,
        getContent,
        getContentACL,
        destroyContent,
        validateTitle,
        validateDescription
    }

}
