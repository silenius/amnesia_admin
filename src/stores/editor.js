import { ref, watch, toValue } from 'vue'
import { defineStore, storeToRefs } from 'pinia'

export const useEditorStore = defineStore('editor', () => {
    const editor = ref()

    function setEditor(e) {
        editor.value = toValue(e)
    }

    return { setEditor, editor }
})

export const useEditorEventStore = defineStore('editorEvent', () => {
    const { editor } = storeToRefs(useEditorStore())
    const nodeSelected = ref()
    const nodeHover = ref()
    const lineage = ref(new Map())

    watch(editor, () => {
        nodeHover.value = null
        nodeSelected.value = null
    })

    watch(nodeHover, () => {
        console.debug('===>>> [WATCH] nodeHover: ', 
            nodeHover?.value?.pos, 
            nodeHover?.value?.node?.type.name
        )
    })

    watch(nodeSelected, () => {
        console.debug('===>>> [WATCH] nodeSelected: ', 
            nodeSelected?.value?.pos, 
            nodeSelected?.value?.node?.type.name
        )

        if (!nodeSelected.value) {
            return false
        }

        const { pos } = nodeSelected.value
        let level = 0

        lineage.value.clear()

        // Compute hierarchy from selected node to the top
        editor.value.view.state.doc.nodesBetween(pos, pos+1, (node, pos_) => {
            if (!node.isText) {
                lineage.value.set(pos_, {
                    node: node,
                    pos: pos_,
                    level: level+=1
                })
            }
        })
    })

    return { nodeSelected, nodeHover, lineage }
})
