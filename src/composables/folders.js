import { useFetchBackend } from '@/composables/fetch.js'
import { ref, computed, readonly, watch } from 'vue';
import { useValidators } from '@/composables/validators.js'

export function useFolder() {

    const browse = async () => {
        return await useFetchBackend('1/browse')

    }

    return {
        browse
    }

}
