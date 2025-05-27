import { computed, ref, toValue } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth.js'
import { useBrowser } from '../composables/useBrowser.js'
import { useFetchBackend } from '../composables/fetch.js'
import { asURLSearchParams } from '../services/url.js'

export const useUsersStore = defineStore('users', () => {
    const authStore = useAuthStore()
    const { result, meta, query, browse, goto_page, change_limit } = useBrowser('auth/browse')

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

    const deleteUser = async (id) => {
        const { error } = await useFetchBackend(`auth/${id}`, {
            method: 'DELETE'
        })

        if (!error) {
            browse()

            if (authStore.user.id == id) {
                authStore.logout()
            }
        }

        return !error
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
