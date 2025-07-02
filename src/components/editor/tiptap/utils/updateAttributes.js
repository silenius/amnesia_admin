import { storeToRefs } from 'pinia'
import { getMarkType } from '@tiptap/core'
import { getNodeType } from '@tiptap/core'
import { getSchemaTypeNameByName } from '@tiptap/core'
import { Extension } from '@tiptap/core'

import { Plugin, PluginKey } from '@tiptap/pm/state'
import { NodeSelection, TextSelection } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from 'prosemirror-view';

import { useEditorEventStore } from '../../../../stores/editor'

const { nodeSelected, nodeHover } = storeToRefs(useEditorEventStore())

const find_dec = (value, spec) => value.find(
    undefined, undefined, (x) => x.node === spec
)

const hl_class = 'outline outline-1 outline-indigo-500'
const sl_class = 'outline outline-1 outline-red-500'

/* 
 * A ProseMirror plugin which highlight "hover" nodes and selected node.
 * It uses ProseMirror "Node decorations" (which add styling or other DOM 
 * attributes to a single node's DOM representation.)
 */

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

            // Highlight node

            if (tr.getMeta('highlightNode')) {
                let { pos } = tr.getMeta('highlightNode')
                pos = parseInt(pos)

                if (pos >= 0) {
                    const node = tr.doc.nodeAt(pos)
                    const hl = find_dec(decorations, 'highlight') 

                    decorations = decorations.remove(hl)

                    if (node) {
                        decorations = decorations.add(tr.doc, [
                            Decoration.node(pos, pos + node.nodeSize, {
                                class: hl_class,
                            }, { 
                                node: 'highlight' 
                            })
                        ])
                    }
                }
            }

            // Selected node

            if (tr.getMeta('selectNode')) {
                let { pos } = tr.getMeta('selectNode')
                pos = parseInt(pos)

                if (pos >= 0) {
                    const node = tr.doc.nodeAt(pos)
                    const sl = find_dec(decorations, 'select')

                    decorations = decorations.remove(sl)

                    if (node) {
                        decorations = decorations.add(tr.doc, [
                            Decoration.node(pos, pos + node.nodeSize, {
                                class: sl_class,
                            }, { 
                                node: 'select' 
                            })
                        ])
                    }
                }
            }

            return {
                decorations: decorations
            }
        }
    },

    props: {

        /*
         * Handle DOM events to update nodeSelected and/or nodeHover.
         * For each event handler we have to find the ProseMirror Node at
         * "event.target" place. All what we have in the "event" is "raw" pure
         * DOM Node with no relationship to ProseMirror details. 
         * To retrieve ProseMirror Node we use the "postAtDOM" function (which
         * gives a document position that corresponds to the node you give it)
         */

        handleDOMEvents: {
            click(view, event) {
                event.preventDefault()
                const target = event.target
                const children = Array.from(target.parentNode?.childNodes || [])
                const offset = children.indexOf(target)
                let pos = Math.max(
                    view.posAtDOM(target.parentElement, offset),
                    0
                )

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
                event.preventDefault()
                const target = event.target
                const children = Array.from(target.parentNode?.childNodes || [])
                const offset = children.indexOf(target)
                let pos = Math.max(
                    view.posAtDOM(target.parentNode, offset),
                    0
                )

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
                event.preventDefault()
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
        // TODO
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
