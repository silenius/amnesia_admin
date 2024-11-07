import { ref } from 'vue'

const select_node = ref()
const select_pos = ref()

const selectNode = (node, pos) => {
    select_node.value = node
    select_pos.value = pos
}

const getSelectedNode = () => {
    return {
        node: select_node,
        pos: select_pos
    }
}

export function useTiptap() {
    return {
        selectNode,
        getSelectedNode
    }

}
