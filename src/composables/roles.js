import { useFetchBackend } from '@/composables/fetch.js'
import { ref, watch } from 'vue';

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
            method: 'POST'
        })

    }

    return {
        roles,
        getRoles,
        destroyRole,
        createRole
    }

}
