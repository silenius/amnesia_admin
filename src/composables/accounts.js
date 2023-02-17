import { useFetchBackend } from '@/composables/fetch.js'
import { ref, watch, readonly } from 'vue';
import { useValidators } from '@/composables/validators.js'

const accounts = ref([])

export function useAccounts() {

    const getAccounts = async () => {
        const res = await useFetchBackend('auth/browse')
        accounts.value = res.data.accounts
    }

    const destroyAccount = async(account_id) => {
        const res = await useFetchBackend(`auth/${account_id}`, {
            method: 'DELETE'
        })

        getAccounts()

    }

    const patchAccount = async (account_id, items) => {
        const data = new FormData()

        for (const [key, value] of Object.entries(items)) {
            data.append(key, value)
        }

        const res = await useFetchBackend(`auth/${account_id}`, {
            method: 'PATCH',
            body: data
        })
        
        getAccounts()
    }

    return {
        accounts: readonly(accounts),
        getAccounts,
        patchAccount,
        destroyAccount
    }
}
