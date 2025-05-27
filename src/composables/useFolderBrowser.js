import { toRefs, ref, toValue, watch, readonly, computed } from 'vue'
import { useBrowser } from '../composables/useBrowser.js'

export function useFolderBrowser(folder, opts) {
    const url = computed(
        () => folder.value?.id ? `${folder.value.id}/browse` : null
    )
    
    const browser = useBrowser(url, opts)

    const view = ref('tabular')

    watch(folder, () => {
        if (folder.value) {
            browser.browse({offset: 0})
        }
    }, {immediate: true})

    return {
        view,
        ...browser,
    }
}
