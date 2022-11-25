import { ref, isRef, unref, watchEffect } from 'vue'

export function useFetch(url, options) {
    const data = ref(null)
    const error = ref(null)

    function doFetch() {
        data.value = null
        error.value = null

        fetch(unref(url), options)
            .then((res) => res.json())
            .then((json) => {
                data.value = json
            })
            .catch((err) => {
                error.value = err
                console.log('There has been a problem with a fetch operation:', error)
            })
    }

    if (isRef(url)) {
        // setup reactive re-fetch if input URL is a ref
        watchEffect(doFetch)
    } else {
        // otherwise, just fetch once
        // and avoid the overhead of a watcher
        doFetch()
    }

    return { data, error }
}
