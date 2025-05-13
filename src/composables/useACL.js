import { useFetchBackend } from './fetch.js'
import { computed, readonly, watch, toRef, toValue } from 'vue'

export function useContentACL(content) {
    // Content ACL
    const { data, error, loading, fetchData } = useFetchBackend()
    
    // Content ACL recursive
    const { 
        data: rec_data, error: rec_error, loading: rec_loading, 
        fetchData: rec_fetchData 
    } = useFetchBackend()

    const reactive_content = toRef(content)

    const acls = computed(
        () => reactive_content.value.acls
    )

    const load = async() => {
        await fetchData(`${reactive_content.value.id}/acl`)
        reactive_content.value.acls = toValue(data)
    }

    const load_recursive_acls = async() => {
        await rec_fetchData(`${reactive_content.value.id}/acls`)
    }

    const change_weight = async({acl_id, acl_idx, weight}) => {
        if (reactive_content.value.id) {
            const { error, fetchData } = useFetchBackend()
            
            const form_data = new FormData()
            form_data.append('weight', weight)

            await fetchData(`acls/${acl_id}`, {
                method: 'PATCH',
                body: form_data
            })

            if (!toValue(error)) {
                await load()
            }
        } else {
            const acl = acls.value.splice(acl_idx, 1)
            acls.value.splice(weight, 0, acl[0])
        }
    }

    const add_acl = async(allow, role, permission) => {
        // Do we add an ACL to an existing content?
        if (reactive_content.value.id) {
            const { 
                error, fetchData: add
            } = useFetchBackend()
            
            const form_data = new FormData()
            
            form_data.append('allow', toValue(allow))
            form_data.append('role_id', toValue(role).id)
            form_data.append('permission_id', toValue(permission).id)

            await add(`${reactive_content.value.id}/acl`, {
                method: 'POST',
                body: form_data
            })

            if (!toValue(error)) {
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
        recursive_acls: readonly(rec_data),
        load_recursive_acls: load_recursive_acls,
        change_acl_weight: change_weight,
        add_acl,
        remove_acl
    }
}
