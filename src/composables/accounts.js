import { useFetchBackend } from '@/composables/fetch.js'
import { ref, watch, readonly } from 'vue';
import { useValidators } from '@/composables/validators.js'

export function useAccounts() {

    const accounts = ref([])

    const getAccounts = async () => {
        const res = await useFetchBackend('auth/browse')
        accounts.value = res.data.accounts
    }

    return {
        accounts: readonly(accounts),
        getAccounts
    }
}
