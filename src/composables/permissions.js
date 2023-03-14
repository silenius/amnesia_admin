import { useFetchBackend } from '@/composables/fetch.js'
import { ref } from 'vue'


const permissions = ref([])

const getPermissions = async () => {
    const res = await useFetchBackend('permissions')
    permissions.value = res
}

export function usePermissions() {
    return {
        permissions,
        getPermissions
    }
}
