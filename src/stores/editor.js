import { ref } from 'vue'
import { defineStore } from 'pinia'

const editors = ref(new Map())

export const useEditorStore = defineStore('editor', () => {
    const setEditor = (key, editor) => editors.value.set(key, editor)
    const getEditor = (key) => editors.value.get(key)

    return { setEditor, getEditor }
})
