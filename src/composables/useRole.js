import { useFetchBackend } from './fetch.js'
import { useBrowser } from './useBrowser.js'
import { onBeforeMount, ref, computed, toRef, readonly, watch } from 'vue';
import { isEmpty, minLength } from '../services/validators.js'

export function useRoles() {
    const browser = useBrowser('roles/browse', {limit: 50})
    const { result, browse } = browser

    const roles = computed(
        () => result.value.roles
    )

    onBeforeMount(() => browse())

    return {
        ...browser,
        roles,

    }
}

export function useRole(role_id) {
    const { data, error, loading, fetchData } = useFetchBackend()
    const reactive_role_id = toRef(role_id)

    const load = async () => {
        await fetchData(`roles/${reactive_role_id.value}`)
    }

    watch(reactive_role_id, () => load(), {immediate: true})

    return {
        role: data,
        load_role: load
    }
}

export function useCreateRole(fields) {
    const role = ref({
        name: '',
        description: ''
    })

    const form_data = new FormData()

    const { data, error, fetchData } = useFetchBackend()

    const create_role = async(container) => {
        for (const key of ['name', 'description']) {
            const value = role.value[key]
            if (value) {
                form_data.append(key, value)
            }
        }

        await fetchData('roles', {
            method: 'POST',
            body: form_data
        })
    }

    watch(data, () => role.value = data.value)

    return {
        role,
        create_role,
        error,
    }
}


export function useRoleMembers(role) {
    const reactive_role = toRef(role)
    const url = ref(`roles/${role.value.id}/members/all`)
    const browser = useBrowser(url, {limit: 50})
    const { result, browse } = browser
    const error = ref()

    const members = computed(
        () => result.value
    )

    const add_member = async (account_id) => {
        const form_data = new FormData()
        form_data.append('account_id', account_id)
        
        const { error } = await useFetchBackend(
            `roles/${reactive_role.value.id}/members`, {
                method: 'POST',
                body: form_data
            }
        )

        if (!error) browse()
    }

    const delete_member = async (account_id) => {
        const form_data = new FormData()
        form_data.append('account_id', account_id)
        
        const { error } = useFetchBackend(
            `roles/${reactive_role.value.id}/members/${account_id}`, {
                method: 'DELETE',
                body: form_data
            }
        )

        if (!error) browse()
    }

    watch(reactive_role, () => browse(), {immediate: true})

    return {
        ...browser,
        members: result,
        add_member,
        delete_member
    }
}

export function useRolePermissions(role) {
    const reactive_role = toRef(role)
    const url = ref(`roles/${role.value.id}/global-permissions`)
    const browser = useBrowser(url)
    const { result, browse } = browser
    const error = ref()

    const permissions = computed(
        () => result.value
    )

    watch(reactive_role, () => browse(), {immediate: true})

    const change_weight = async (acl_id, weight) => {
        const form_data = new FormData()
        form_data.append('weight', weight)

        const { data, error } = await useFetchBackend(`acls/${acl_id}`, {
            method: 'PATCH',
            body: form_data
        })

        if (!error) {
            browse()
        }

        return { data, error }
    }

    const add_global_acl = async (id, permission_id, allow) => {
        const form_data = new FormData()
        form_data.append('permission_id', permission_id)
        form_data.append('allow', allow)

        const { data, error } = await useFetchBackend(`roles/${id}/acls`, {
            method: 'POST',
            body: form_data
        })

        if (!error) {
            browse()
        }

        return { data, error }
    }

    const delete_global_acl = async (acl_id) => {
        const { error, data } = await useFetchBackend(`acls/${acl_id}`, {
            method: 'DELETE'
        })

        if (!error) {
            browse()
        }

        return { data, error }
    }

    const update_global_acl = async (acl_id, allow) => {
        const form_data = new FormData()
        form_data.append('allow', allow)

        const { data, error } = await useFetchBackend(`acls/${acl_id}`, {
            method: 'PATCH',
            body: form_data
        })

        if (!error) {
            browse()
        }

        return { data, error }
    }

    return { 
        ...browser,
        permissions,
        change_weight,
        add_global_acl,
        delete_global_acl,
        update_global_acl
    }
}


/*
export function useRoles() {

    const roles = ref([])

    const getRoles = async () => {
        const { data } = await useFetchBackend('roles/browse')
        roles.value = data.data.roles
    }

    const destroyRole = async (id) => {
        await useFetchBackend(`roles/${id}`, {
            method: 'DELETE'
        })

        getRoles()
    }

    const createRole = async (role) => {
        const data = role_to_formdata(role)

        return await useFetchBackend('roles', {
            method: 'POST',
            body: data
        })
    }

    return {
        roles: readonly(roles),
        getRoles,
        destroyRole,
        createRole
    }
}
*/

// TODO: use Pinia?
// return .value ??
// return readonly() ?

/*
export function useRole() {
    const getRole = async (id) => {
        return useFetchBackend(`roles/${id}`)
    }

    const getMembers = async (id) => {
        return useFetchBackend(`roles/${id}/members/all`)
    }

    const getPermissions = async (id) => {
        return useFetchBackend(`roles/${id}/global-permissions`)
    }

    const addGlobalACL = async (id, permission_id, allow) => {
        const data = new FormData()
        data.append('permission_id', permission_id)
        data.append('allow', allow)

        return useFetchBackend(`roles/${id}/acls`, {
            method: 'POST',
            body: data
        })
    }

    const patchGlobalACL = async (acl_id, items) => {
        const data = new FormData()

        for (const [key, value] of Object.entries(items)) {
            data.append(key, value)
        }

        return await useFetchBackend(`acls/${acl_id}`, {
            method: 'PATCH',
            body: data
        })
    }

    const deleteGlobalACL = async (acl_id) => {
        return useFetchBackend(`acls/${acl_id}`, {
            method: 'DELETE'
        })
        
    }

    const addMember = async (role_id, account_id) => {
        const data = new FormData()
        data.append('account_id', account_id)
        
        return useFetchBackend(
            `roles/${role_id}/members`, {
                method: 'POST',
                body: data
            }
        )
    }

    const deleteMember = async (role_id, account_id) => {
        const data = new FormData()
        data.append('account_id', account_id)
        
        return useFetchBackend(
            `roles/${role_id}/members/${account_id}`, {
                method: 'DELETE',
                body: data
            }
        )
    }

    const updateRole = async (id) => {
        const data = role_to_formdata(role)

        return await useFetchBackend(`roles/${id}`, {
            method: 'PUT',
            body: data
        })
    }

    const validateName = (value) => {
        return !value ? isEmpty('name', value) : minLength('name', value, {min: 4})
    }

    const validateDescription = (value) => {
        return false
    }

    return {
        validateName,
        validateDescription,
        updateRole,
        getRole,
        getMembers,
        getPermissions,
        addMember,
        addGlobalACL,
        deleteGlobalACL,
        patchGlobalACL,
        deleteMember,
    }
}
*/
