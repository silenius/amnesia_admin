import { useFetchBackend } from '@/composables/fetch.js'

export function useContentTypes() {

    const getContentTypes = async () => {
        return useFetchBackend('content-type')
    }

    return {
        getContentTypes
    }

}
