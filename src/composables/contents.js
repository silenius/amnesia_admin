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

const addContentACL = async (allow, role_id, permission_id) => {
    const data = new FormData()

    data.append('allow', allow)
    data.append('role_id', role_id)
    data.append('permission_id', permission_id)

    await useFetchBackend(`${content.value.id}/acl`, {
        method: 'POST',
        body: data
    })
}

const deleteContentACL = async (acl_id) => {
    await useFetchBackend(`acls/${acl_id}`, {
        method: 'DELETE'
    })
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
        addContentACL,
        deleteContentACL,
        destroyContent,
        validateTitle,
        validateDescription
    }

}
