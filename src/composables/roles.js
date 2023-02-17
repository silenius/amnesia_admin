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
        const res = await useFetchBackend('roles/browse')
        roles.value = res.data.roles
    }

    const destroyRole = async (id) => {
        const res = await useFetchBackend(`roles/${id}`, {
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
        role: role,
        getRoles,
        destroyRole,
        createRole
    }
}

// TODO: use Pinia?
// return .value ??
// return readonly() ?

const role = ref({})

export function useRole() {
    const { isEmpty, minLength } = useValidators()

    const getRole = async (id) => {
        const res = await useFetchBackend(`roles/${id}`)
        role.value = res
    }

    const getMembers = async () => {
        const res = await useFetchBackend(`roles/${role.value.id}/members/all`)
        role.value.members = res
    }

    const getPermissions = async () => {
        const res = await useFetchBackend(`roles/${role.value.id}/global-permissions`)
        role.value.permissions = res
    }

    const addGlobalACL = async (permission_id, allow) => {
        const data = new FormData()
        data.append('permission_id', permission_id)
        data.append('allow', allow)

        const res = await useFetchBackend(`roles/${role.value.id}/acls`, {
            method: 'POST',
            body: data

        })
    }

    const patchGlobalACL = async (acl_id, items) => {
        const data = new FormData()

        for (const [key, value] of Object.entries(items)) {
            data.append(key, value)
        }

        const res = await useFetchBackend(`acls/${acl_id}`, {
            method: 'PATCH',
            body: data
        })
    }

    const deleteGlobalACL = async (acl_id) => {
        const res = await useFetchBackend(`acls/${acl_id}`, {
            method: 'DELETE'
        })
        
    }

    const addMember = async (id) => {
        const data = new FormData()
        data.append('account_id', id)
        
        const res = await useFetchBackend(
            `roles/${role.value.id}/members`, {
                method: 'POST',
                body: data
            }
        )
    }

    const deleteMember = async (id) => {
        const data = new FormData()
        data.append('account_id', id)
        
        const res = await useFetchBackend(
            `roles/${role.value.id}/members/${id}`, {
                method: 'DELETE',
                body: data
            }
        )
    }

    const updateRole = async () => {
        const data = role_to_formdata(role)

        return await useFetchBackend(`roles/${role.value.id}`, {
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
        role: role
    }
}

