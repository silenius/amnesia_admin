import { useFetchBackend } from '@/composables/fetch.js'
import { ref, watch } from 'vue';
import { useValidators } from '@/composables/validators.js'

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

    const createRole = async (data) => {
        const res = await useFetchBackend('roles', {
            method: 'POST',
            body: data
        })
    }

    return {
        roles,
        getRoles,
        destroyRole,
        createRole
    }
}

// TODO: use Pinia?
// return .value ??
// return readonly() ?
const errors = ref({})
const role = ref({})

export function useRole() {
    const { isEmpty, minLength } = useValidators()

    const getRole = async (id) => {
        const res = await useFetchBackend(`roles/${id}`)
        role.value = res
    }

    const updateRole = async () => {
        const data = new FormData()
        console.log(role.value)
        data.append('name', role.value.name)
        data.append('description', role.value.description)

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
        errors,
        validateName,
        validateDescription,
        updateRole,
        getRole,
        role
    }
}

