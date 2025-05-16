import { ref } from 'vue'
import { useFetchBackend } from './fetch.js'

export function useAccount() {

}

export function useCreateAccount() {
    const account = ref({})

    const create_account = async() => {
        const form_data = account_as_formdata(account)
        await fetchData('account/register', {
            method: 'POST',
            body: form_data
        })
    }

    return {
        account,
        create_account
    }

}
