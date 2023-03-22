import { useFetchBackend } from '@/composables/fetch.js'

export function useAccounts() {

    const getAccounts = async () => {
        return useFetchBackend('auth/browse')
    }

    const destroyAccount = async(account_id) => {
        return useFetchBackend(`auth/${account_id}`, {
            method: 'DELETE'
        })
    }

    const patchAccount = async (account_id, items) => {
        const data = new FormData()

        for (const [key, value] of Object.entries(items)) {
            data.append(key, value)
        }

        return useFetchBackend(`auth/${account_id}`, {
            method: 'PATCH',
            body: data
        })
    }

    return {
        getAccounts,
        patchAccount,
        destroyAccount
    }
}
