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
    const role = ref({
        name: '',
        description: ''
    })

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

    const createRole = async () => {
        const data = role_to_formdata(role)

        const res = await useFetchBackend('roles', {
            method: 'POST',
            body: data
        })
    }

    return {
        roles: readonly(roles),
        role: readonly(role),
        getRoles,
        destroyRole,
        createRole
    }
}

// TODO: use Pinia?
// return .value ??
// return readonly() ?

const role = ref({})
const errors = ref({})

export function useRole() {
    const { isEmpty, minLength } = useValidators()

    const getRole = async (id) => {
        const res = await useFetchBackend(`roles/${id}`)
        role.value = res
    }

    const getMembers = async () => {
        const res = await useFetchBackend(`roles/${role.value.id}/members`)
        role.value.members = res
    }

    const updateRole = async () => {
        const data = role_to_formdata(role)

        const res = await useFetchBackend(`roles/${role.value.id}`, {
            method: 'PUT',
            body: data
        })
    }

    const validateName = (value) => {
        errors.value.name = !value ? isEmpty('name', value) : minLength('name', value, 4)
    }

    const validateDescription = (value) => {
        return true
    }

    return {
        errors: readonly(errors),
        validateName,
        validateDescription,
        updateRole,
        getRole,
        getMembers,
        role: role
    }
}

