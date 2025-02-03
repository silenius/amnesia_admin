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

    watch (editor, () => {
        nodeHover.value = null
        nodeSelected.value = null
    })

    watch (nodeHover, () => {
        console.debug('===>>> [WATCH] nodeHover: ', 
            nodeHover?.value?.pos, 
            nodeHover?.value?.node?.type.name
        )
 
    })

    watch (nodeSelected, () => {
        console.debug('===>>> [WATCH] nodeSelected: ', 
            nodeSelected?.value?.pos, 
            nodeSelected?.value?.node?.type.name
        )
        
        const { pos, node } = nodeSelected.value
        let level = 0

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
