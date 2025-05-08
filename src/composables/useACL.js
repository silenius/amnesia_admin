import { useFetchBackend } from './fetch.js'
import { computed, watch, toRef, toValue } from 'vue'

export function useContentACL(content) {
    const { data, error, loading, fetchData } = useFetchBackend()
    const reactive_content = toRef(content)

    const acls = computed(
        () => reactive_content.value.acls
    )

    const load = async() => {
        await fetchData(`${reactive_content.value.id}/acl`)
        reactive_content.value.acls = toValue(data)
    }

    const add_acl = async(allow, role, permission) => {
        // Do we add an ACL to an existing content?
        if (reactive_content.value.id) {
            const { 
                data: acl_data, error: acl_error, fetchData: add
            } = useFetchBackend()
            
            const form_data = new FormData()
            
            form_data.append('allow', toValue(allow))
            form_data.append('role_id', toValue(role).id)
            form_data.append('permission_id', toValue(permission).id)

            await add(`${reactive_content.value.id}/acl`, {
                method: 'POST',
                body: form_data
            })

            if (!toValue(acl_error)) {
                await load()
            }
        } else {
            reactive_content.value.acls.unshift({
                allow: toValue(allow),
                role: toValue(role),
                permission: toValue(permission)
            })
        }
    }

    const remove_acl = async(acl, idx) => {
        if (reactive_content.value.id) {
            const { 
                data: acl_data, error: acl_error, fetchData: remove
            } = useFetchBackend()

            await remove(`acls/${acl.id}`, {
                method: 'DELETE'
            })

            if (!toValue(acl_error)) {
                await load()
            }
        } else {
            reactive_content.value.acls.splice(idx, 1)
        }
    }

    return {
        acls,
        add_acl,
        remove_acl
    }
}
