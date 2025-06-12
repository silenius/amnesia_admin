import { useFetchBackend } from '../composables/fetch.js'
import { as_id } from './utils.js'
import { toValue } from 'vue'

export function account_as_formdata(account) {
    const data = new FormData()
    const account_value = toValue(account)

    const fields = [
        'first_name',
        'last_name',
        'login',
        'email',
        'password'
    ]

    for (const field of fields) {
        data.append(field, account_value[field])
    }

    return data
}

export async function delete_account(account_or_id) {
    const id = as_id(account_or_id)

    if (id) {
        const { error } = await useFetchBackend(`auth/${id}`, {
            method: 'DELETE'
        })

        return !error
    }

    return false
}

export function create_account(account_or_formdata) {
    if (!account_or_formdata instanceof FormData) {
        account_or_formdata = account_as_formdata(account_or_formdata)
    }

    return useFetchBackend('/accounts', {
        method: 'POST',
        body: account_or_formdata
    })
}
