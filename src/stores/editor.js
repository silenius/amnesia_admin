import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useEditorStore = defineStore('editor', () => {
    const editor = ref()

    function setEditor(e) {
        editor.value = e
    }

    return { setEditor, editor }
})

export const useEditorEventStore = defineStore('editorEvent', () => {

    const { editor } = useEditorStore()

    const nodeSelected = ref()
    const nodeHover = ref()
    const lineage = ref()

    watch (nodeSelected, () => {
        const { pos, node } = nodeSelected.value

        lineage.value.clear()

        editor.value.view.state.doc.nodesBetween(pos, pos+1, (_node, _pos) => {
            if (!_node.isText) {
                lineage.value.set(_pos, {
                    node: _node,
                    pos: _pos,
                    level: level+=1
                })
            }
        })
    })

    return { nodeSelected, nodeHover, lineage }
})
