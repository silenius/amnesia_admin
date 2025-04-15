import { ref, readonly, computed } from 'vue'

export function useContentSelection() {
    const selection = ref(new Map())
    const selection_ids = computed(
        () => Array.from(selection.value.keys())
    )

    const select = (content) => selection.value.set(content.id, content)
    const unselect = (content) => selection.value.delete(content.id)
    const toggle = (content) => selection.value.has(content.id) ? unselect(content) : select(content)
    const select_or_unselect = (content, true_false) => true_false === true ? select(content) : unselect(content)

    return {
        selection: readonly(selection),
        selection_ids: readonly(selection_ids),
        select,
        unselect,
        select_or_unselect,
        toggle
    }
}
