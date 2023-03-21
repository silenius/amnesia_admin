import { useFetchBackend } from '@/composables/fetch.js'
import { ref } from 'vue'


const permissions = ref([])

const getPermissions = async () => {
    const { data } = await useFetchBackend('permissions')
    permissions.value = data
}

export function usePermissions() {
    return {
        permissions,
        getPermissions
    }
}
