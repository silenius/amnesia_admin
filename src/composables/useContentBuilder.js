import { ref, toValue, watch } from 'vue'

export function useBuildContent(data) {
    const formatted = ref(null)

    const build = () => {
        if (!toValue(data)) {
            formatted.value = null
        } else {
            const copy = { ...toValue(data) }
            for (const key of ['added', 'updated', 'last_update']) {
                try {
                    copy[key] = new Date(data.value[key])
                } catch (e) {
                    copy[key] = null
                }
            }

            if (data.value['props'] === null) {
                copy['props'] = {}
            }

            formatted.value = copy
        }
    }

    watch(data, () => build(), { immediate: true })

    return {
        formatted: formatted
    }
}

export function useBuildFolder(data) {
    return useBuildContent(data)
}
