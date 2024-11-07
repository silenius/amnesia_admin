import { getMarkType } from '@tiptap/core'
import { getNodeType } from '@tiptap/core'
import { getSchemaTypeNameByName } from '@tiptap/core'
import { Extension } from '@tiptap/core'
import { useTiptap } from '@/composables/tiptap'

import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from 'prosemirror-view';

const { getSelectedNode } = useTiptap()


const selectionPlugin = () => { 
    return new Plugin({
        key: new PluginKey('selection'),
        props: {
            decorations: (state) => {
                const { node, pos } = getSelectedNode()
                console.log('THIS ::: ', this)
                console.log('SSSTATE ::: ', state)
                console.log(state.tr.getMeta('pos'))

                if (node.value && pos.value) {
                    return DecorationSet.create(state.doc, [
                        Decoration.node(pos.value, pos.value + node.value.nodeSize, {
                            class: "border border-red-500",
                        }),
                    ]);
                }

                return DecorationSet.empty
            }
        }
    })
}


export const TipTapCommands = Extension.create({
    name: 'tiptapCommands',

    addProseMirrorPlugins() {
        return [
            selectionPlugin()
        ]
    },

    addCommands() {
        return {
            _updateAttributes: (typeOrName, attributes = {}) => ({ tr, state, dispatch }) => {
                let nodeType = null
                let markType = null

                const schemaType = getSchemaTypeNameByName(
                    typeof typeOrName === 'string' ? typeOrName : typeOrName.name,
                    state.schema,
                )

                if (!schemaType) {
                    return false
                }

                if (schemaType === 'node') {
                    nodeType = getNodeType(typeOrName, state.schema)
                }

                if (schemaType === 'mark') {
                    markType = getMarkType(typeOrName, state.schema)
                }

                if (dispatch) {
                    tr.selection.ranges.forEach(range => {
                        const from = range.$from.pos
                        const to = range.$to.pos

                        let lastPos
                        let lastNode
                        let trimmedFrom
                        let trimmedTo

                        if (tr.selection.empty) {
                            state.doc.nodesBetween(from, to, (node, pos) => {

                                if (nodeType && nodeType === node.type) {
                                    trimmedFrom = Math.max(pos, from)
                                    trimmedTo = Math.min(pos + node.nodeSize, to)
                                    lastPos = pos
                                    lastNode = node
                                }
                            })
                        } else {
                            state.doc.nodesBetween(from, to, (node, pos) => {

                                if (pos < from && nodeType && nodeType === node.type) {
                                    trimmedFrom = Math.max(pos, from)
                                    trimmedTo = Math.min(pos + node.nodeSize, to)
                                    lastPos = pos
                                    lastNode = node
                                }

                                if (pos >= from && pos <= to) {

                                    if (nodeType && nodeType === node.type) {
                                        tr.setNodeMarkup(pos, undefined, {
                                            ...node.attrs,
                                            ...attributes,
                                        })
                                    }

                                    if (markType && node.marks.length) {
                                        node.marks.forEach(mark => {

                                            if (markType === mark.type) {
                                                const trimmedFrom2 = Math.max(pos, from)
                                                const trimmedTo2 = Math.min(pos + node.nodeSize, to)

                                                tr.addMark(
                                                    trimmedFrom2,
                                                    trimmedTo2,
                                                    markType.create({
                                                        ...mark.attrs,
                                                        ...attributes,
                                                    }),
                                                )
                                            }
                                        })
                                    }
                                }
                            })
                        }

                        if (lastNode) {

                            if (lastPos !== undefined) {
                                tr.setNodeMarkup(lastPos, undefined, {
                                    ...lastNode.attrs,
                                    ...attributes,
                                })
                            }

                            if (markType && lastNode.marks.length) {
                                lastNode.marks.forEach(mark => {
                                    if (markType === mark.type) {
                                        tr.addMark(
                                            trimmedFrom,
                                            trimmedTo,
                                            markType.create({
                                                ...mark.attrs,
                                                ...attributes,
                                            }),
                                        )
                                    }
                                })
                            }
                        }
                    })

                }
                return true
            }
        }
    }
})

export default TipTapCommands
