import { useFetchBackend } from '@/composables/fetch.js'
import { ref, computed, readonly, watch } from 'vue';
import { useValidators } from '@/composables/validators.js'

const role_to_formdata = (role) => {
    const data = new FormData()

    data.append('name', role.value.name)
    data.append('description', role.value.description)

    return data
}

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

// TODO: use Pinia?
// return .value ??
// return readonly() ?

export function useRole() {
    const { isEmpty, minLength } = useValidators()

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
        return !value ? isEmpty('name', value) : minLength('name', value, 4)
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

