import { useFetchBackend } from '../composables/fetch.js'
import { as_id } from './utils.js'
import { toValue } from 'vue'

export function account_as_formdata(account, fields) {
    const data = new FormData()
    const account_value = toValue(account)

    if (!fields) {
        fields = [
            'first_name',
            'last_name',
            'login',
            'email',
            'password',
            'password_repeat'
        ]
    }

    for (const field of fields) {
        const value = account_value[field]

        if (value !== undefined) {
            data.append(field, value === null ? '' : value)
        }
    }

    return data
}

export async function delete_account(account_or_id) {
    const id = as_id(account_or_id)

    if (id) {
        return useFetchBackend(`auth/${id}`, {
            method: 'DELETE'
        })
    }
}

export function create_account(account) {
    const form_data = account_as_formdata(account)

    return useFetchBackend('auth/register', {
        method: 'POST',
        body: form_data
    })
}

export function update_account(account) {
    const form_data = account_as_formdata(account)

    return useFetchBackend('accounts', {
        method: 'PUT',
        body: form_data
    })
}

export function reset_account_password(account) {
    const id = as_id(account)
    const form_data = account_as_formdata(account, ['email'])

    if (id) {
        return useFetchBackend('auth/lost', {
            method: 'POST',
            body: form_data
        })
    }
}
