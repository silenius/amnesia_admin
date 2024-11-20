import { getMarkType } from '@tiptap/core'
import { getNodeType } from '@tiptap/core'
import { getSchemaTypeNameByName } from '@tiptap/core'
import { Extension } from '@tiptap/core'
import { useTiptap } from '@/composables/tiptap'

import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from 'prosemirror-view';

const { getSelectedNode } = useTiptap()

const find_dec = (value, spec) => value.find(
    undefined, undefined, (x) => x.node === spec
)

const outlineNodePlugin = new Plugin({
    key: new PluginKey('outlineNode'),
    state: {
        init() {
            console.debug('===> BEGIN outlineNode init')
            return DecorationSet.empty
            console.debug('===> END outlineNode init')
        },

        apply(tr, value) {
            console.debug('===> BEGIN outlineNode apply: [tr] ', tr, ' [value] ', value)
            if (tr.getMeta('highlightNode')) {
                const { pos, node } = tr.getMeta('highlightNode')
                const hl = find_dec(value, 'highlight') 

                value = value.remove(hl)

                if (pos !== null && node !== null) {
                    value = value.add(tr.doc, [Decoration.node(
                        pos, pos + node.nodeSize, {
                            class: "outline-1 outline-dotted outline-red-500",
                        }, { node: 'highlight' })]
                    )
                }
            } 

            if (tr.getMeta('selectNode')) {
                const { pos, node } = tr.getMeta('selectNode')
                const sl = find_dec(value, 'select')

                value = value.remove(sl)

                if (pos !== null && node !== null) {
                    value = value.add(tr.doc, [Decoration.node(
                        pos, pos + node.nodeSize, {
                            class: "outline outline-1 outline-red-700",
                        }, { node: 'select' })]
                    )
                }
            }

            console.debug('===> END outlineNode apply')

            return value.map(tr.mapping, tr.doc)
        }
    },

    props: {
        decorations: (state) => {
            return outlineNodePlugin.getState(state)
        }
    }
})


export const TipTapCommands = Extension.create({
    name: 'tiptapCommands',

    addProseMirrorPlugins() {
        return [
            outlineNodePlugin
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
