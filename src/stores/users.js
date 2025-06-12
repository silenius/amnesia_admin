import { computed, ref, toValue } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth.js'
import { useBrowser } from '../composables/useBrowser.js'
import { useFetchBackend } from '../composables/fetch.js'
import { asURLSearchParams } from '../services/url.js'
import { create_account, delete_account } from '../services/account.js'

export const useUsersStore = defineStore('users', () => {
    const authStore = useAuthStore()
    const { result, meta, query, browse, goto_page, change_limit } = useBrowser('auth/browse', {limit: 50})

    const users = computed(
        () => result.value?.accounts
    )

    const patch = async (id, items) => {
        const form_data = new FormData()

        for (const [key, value] of Object.entries(items)) {
            form_data.append(key, value)
        }

        const { error, data } = await useFetchBackend(`auth/${id}`, {
            method: 'PATCH',
            body: form_data
        })

        await browse()

        if (data.id == authStore.user.id) {
            authStore.user = { ...authStore.user, ...data };
        }
    }

    const deleteUser = async (user_or_id) => {
        if (delete_account(user_or_id)) {
            browse()

            if (authStore.user.id == id) {
                authStore.logout()
            }
        }
    }

    const create = async (account_data) => {
        const { error, data } = await create_account(account_data)

        if (!error) {
            browse()
        }

        return data
    }

    return {
        users,
        meta,
        browse,
        query,
        patch,
        deleteUser,
        goto_page,
        change_limit
    }
})
