import { storeToRefs } from 'pinia'
import { getMarkType } from '@tiptap/core'
import { getNodeType } from '@tiptap/core'
import { getSchemaTypeNameByName } from '@tiptap/core'
import { Extension } from '@tiptap/core'
import { useTiptap } from '@/composables/tiptap'

import { Plugin, PluginKey } from '@tiptap/pm/state'
import { NodeSelection, TextSelection } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from 'prosemirror-view';

import { useEditorEventStore } from '@/stores/editor'

const storeEditorEvent = useEditorEventStore()

const { getSelectedNode } = useTiptap()

const find_dec = (value, spec) => value.find(
    undefined, undefined, (x) => x.node === spec
)

const outlineNodePlugin = new Plugin({
    key: new PluginKey('outlineNode'),
    state: {
        init() {
            return {
                decorations: DecorationSet.empty
            }
        },

        apply(tr, value) {
            let { decorations } = value

            decorations = decorations.map(tr.mapping, tr.doc)

            if (tr.getMeta('highlightNode')) {
                const { pos } = tr.getMeta('highlightNode')

                if (parseInt(pos) >= 0) {
                    const node = tr.doc.nodeAt(pos)
                    const hl = find_dec(decorations, 'highlight') 

                    decorations = decorations.remove(hl)

                    if (node) {
                        decorations = decorations.add(tr.doc, [Decoration.node(
                            pos, pos + node.nodeSize, {
                                class: "outline-1 outline outline-indigo-500",
                            }, { node: 'highlight' })]
                        )
                    }
                }
            }

            if (tr.getMeta('selectNode')) {
                const { pos } = tr.getMeta('selectNode')

                if (parseInt(pos) >= 0) {
                    const node = tr.doc.nodeAt(pos)
                    const sl = find_dec(decorations, 'select')

                    decorations = decorations.remove(sl)

                    if (node) {
                        decorations = decorations.add(tr.doc, [Decoration.node(
                            pos, pos + node.nodeSize, {
                                class: "outline outline-1 outline-red-500",
                            }, { node: 'select' })]
                        )
                    }
                }
            }

            return {
                decorations: decorations
            }
        }
    },

    props: {
        handleDOMEvents: {
            click(view, event) {
                const { nodeSelected } = storeToRefs(storeEditorEvent)
                const target = event.target
                const children = Array.from(target.parentNode?.childNodes || [])
                const offset = children.indexOf(target)
                let pos = view.posAtDOM(target.parentElement, offset)
                let node = view.state.doc.nodeAt(pos)

                if (!node || node.isText) {
                    const $pos = view.state.doc.resolve(pos)
                    pos = $pos.before()
                    node = view.state.doc.nodeAt(pos)
                }

                nodeSelected.value = {
                    node: node,
                    pos: pos
                }
            },

            mouseover(view, event) {
                const { nodeHover } = storeToRefs(storeEditorEvent)
                const target = event.target
                const children = Array.from(target.parentNode?.childNodes || [])
                const offset = children.indexOf(target)
                let pos = view.posAtDOM(target.parentNode, offset)
                let node = view.state.doc.nodeAt(pos)

                if (!node || node.isText) {
                    const $pos = view.state.doc.resolve(pos)
                    pos = $pos.before()
                    node = view.state.doc.nodeAt(pos)
                }

                nodeHover.value = {
                    node: node,
                    pos: pos
                }
            },

            keyup(view, event) {
                const { nodeSelected } = storeToRefs(storeEditorEvent)
                const selection = view.state.selection
                const $pos = selection.$anchor
                let pos = $pos.pos
                let node = view.state.doc.nodeAt(pos)

                if (!node || node.isText) {
                    pos = $pos.before()
                    node = view.state.doc.nodeAt(pos)
                }

                nodeSelected.value = {
                    node: node,
                    pos: pos
                }
            },
        },
        decorations: (state) => {
            return outlineNodePlugin.getState(state).decorations
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

    /*
    addStorage() {
        return {
            lineage: new Map()
        }
    },

    onSelectionUpdate({ editor, transaction}) {
        console.log('===>>> SELECTION UPDATE', transaction)
    },
    */

    addCommands() {
        return {
            _setTw : ({target, types, key, value, valid_values, breakpoint}) => (p) => {
                let type

                if (target === undefined) {
                    type = types.find((e) => p.editor.isActive(e))
                    if (!type) return false
                }

                const attrs = type ? p.editor.getAttributes(target) : target.node.attrs
                let attr = attrs[key]

                attr = Array.isArray(attr)
                    ? attr.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if (valid_values.indexOf(value) !== -1) {
                    // New value
                    attr.push({
                        breakpoint: breakpoint,
                        tw: value
                    })
                }

                attr = Object.fromEntries([[`${key}`, attr]])

                if (!p.state.selection.empty && p.state.selection.toJSON().type == 'text') {
                    return p.commands.setMark('textClass', attr)
                } else if (target) {
                    return p.commands._updateNodeAttributes(
                        target.pos, target.node, attr
                    )
                } else {
                    return p.commands.updateAttributes(
                        type, attr
                    )
                }


            },
            _updateNodeAttributes: (pos, node, attributes = {}) => ({ tr }) => {
                tr.setNodeMarkup(pos, undefined, {
                    ...node.attrs,
                    ...attributes,
                })

                return true
            },
        }
    }
})

export default TipTapCommands
