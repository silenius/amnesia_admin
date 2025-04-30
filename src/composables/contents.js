import { useFetchBackend } from './fetch.js'

const getContent = async (id) => {
    const { data, fetchData } = useFetchBackend()
    await fetchData(id)
    return data
}

const getContentACL = async (id) => {
    return useFetchBackend(`${id}/acl`)
}

const getContentParentACLS = async(id) => {
    return useFetchBackend(`${id}/acls`)
}

const addContentACL = async (content_id, allow, role_id, permission_id) => {
    const data = new FormData()

    data.append('allow', allow)
    data.append('role_id', role_id)
    data.append('permission_id', permission_id)

    await useFetchBackend(`${content_id}/acl`, {
        method: 'POST',
        body: data
    })
}

const patchContentACL = async (acl_id, items) => {
    const data = new FormData()

    for (const [key, value] of Object.entries(items)) {
        data.append(key, value)
    }

    await useFetchBackend(`acls/${acl_id}`, {
        method: 'PATCH',
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

const setWeight = async(id, weight) => {
}

const publishContent = async (id) => useFetchBackend(`${id}/publish`, {
    method: 'POST'
})

const unpublishContent = async (id) => useFetchBackend(`${id}/unpublish`, {
    method: 'POST'
})

export function useContent() {
    return {
        getContent,
        getContentACL,
        getContentParentACLS,
        addContentACL,
        deleteContentACL,
        patchContentACL,
        destroyContent,
        setWeight,
        publishContent,
        unpublishContent,
    }

}
