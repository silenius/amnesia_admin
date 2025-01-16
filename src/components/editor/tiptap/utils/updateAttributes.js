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
            console.debug('===> BEGIN outlineNode init')
            return {
                decorations: DecorationSet.empty
            }
        },

        apply(tr, value) {
            console.debug('===> BEGIN outlineNode apply: [tr] ', tr, ' [value] ', value)
            let { decorations } = value

            decorations = decorations.map(tr.mapping, tr.doc)

            if (tr.getMeta('highlightNode')) {
                const { pos } = tr.getMeta('highlightNode')
                const node = tr.doc.nodeAt(pos)
                const hl = find_dec(decorations, 'highlight') 

                decorations = decorations.remove(hl)

                if (pos && node) {
                    console.log('===>>> highlightNode : ', pos, node.type.name)
                    decorations = decorations.add(tr.doc, [Decoration.node(
                        pos, pos + node.nodeSize, {
                            class: "outline-2 outline outline-indigo-500",
                        }, { node: 'highlight' })]
                    )
                }
            } 

            if (tr.getMeta('selectNode')) {
                const { pos } = tr.getMeta('selectNode')
                const node = tr.doc.nodeAt(pos)
                const sl = find_dec(decorations, 'select')

                decorations = decorations.remove(sl)

                if (pos && node) {
                    console.log('=== selectNode ===', pos, node.type.name)
                    decorations = decorations.add(tr.doc, [Decoration.node(
                        pos, pos + node.nodeSize, {
                            class: "outline outline-2 outline-red-700",
                        }, { node: 'select' })]
                    )
                }
            }

            console.debug('===> END outlineNode apply')

            return {
                decorations: decorations
            }
        }
    },

    props: {
        handleDOMEvents: {
            click(view, event) {
                const { nodeSelected, lineage } = storeToRefs(storeEditorEvent)
                const selection = view.state.selection
                // We clicked in the editor, retrieve the PM document position
                let pos = view.posAtDOM(event.target)

                // Compute the new lineage from that pos
                const new_lineage = new Map()
                let level = 0

                view.state.doc.nodesBetween(selection.from, selection.to, (node, pos) => {
                    if (!node.isText) {
                        new_lineage.set(pos, {
                            node: node,
                            pos: pos,
                            level: level+=1
                        })
                    }
                })

                lineage.value = new_lineage

                // Check which node do we have at this pos
                let node = view.state.doc.nodeAt(pos)

                if (node.isText) {
                    // If it's a text, set pos to the deepest node in the
                    // lineage tree (99% of the time Paragraph, but could also
                    // be Image or ...)
                    pos = [...lineage.value.keys()].at(-1)
                } else {
                    // If not then find the closest node in the lineage tree at
                    // this pos
                    pos = [...lineage.value.keys()].reduce(
                        (prev, curr) => Math.abs(curr - pos) < Math.abs(prev - pos) ? curr : prev
                    )
                }

                node = view.state.doc.nodeAt(pos)

                nodeSelected.value = {
                    node: node,
                    pos: pos
                }
            },

            mouseover(view, event) {
                const { nodeHover } = storeToRefs(storeEditorEvent)
                const selection = view.state.selection
                // We clicked in the editor, retrieve the PM document position
                let pos = view.posAtDOM(event.target)

                // Compute the new lineage from that pos
                const lineage = []

                view.state.doc.nodesBetween(pos, pos, (node, _pos) => {
                    if (!node.isText) {
                        lineage.push(_pos)
                    }
                })

                if (lineage.length > 0) {
                    pos = lineage.reduce(
                        (prev, curr) => Math.abs(curr - pos) < Math.abs(prev - pos) ? curr : prev
                    )
                }

                // Check which node do we have at this pos
                const node = view.state.doc.nodeAt(pos)

                nodeHover.value = {
                    node: node,
                    pos: pos
                }
            },

            keyup(view, event) {
                const selection = view.state.selection
                const { lineage } = storeToRefs(storeEditorEvent)
                let level = 0

                const new_lineage = new Map()

                view.state.doc.nodesBetween(selection.from, selection.to, (node, pos) => {
                    if (!node.isText) {
                        new_lineage.set(pos, {
                            node: node,
                            pos: pos,
                            level: level+=1
                        })
                    }
                })

                lineage.value = new_lineage
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
    },
    */

    addCommands() {
        return {
            /*
            _setTw : (key, value, valid_values, breakpoint, type, selected) => () => {
                if (!selected && !type) {
                    type = this.options.types.find((e) => p.editor.isActive(e))
                }

                let attrs = selected ? selected.node.attrs[key] : p.editor.getAttributes(type)[key]

                let attr = Array.isArray(attrs)
                    ? attrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if (valid_values.indexOf(value) !== -1) {
                    // New value
                    attr.push({
                        breakpoint: breakpoint,
                        tw: `${side}-${level}`
                    })
                }

                attr = Object.fromEntries([[`${key}`, attr]])

                console.log('PADDING ATTR: ', attr)
                console.log(p.state.selection)
                console.log(selected)

                if (!p.state.selection.empty && p.state.selection.toJSON().type == 'text') {
                    return p.commands.setMark('textClass', attr)
                } else if (selected) {
                    return p.commands._updateNodeAttributes(
                        selected.pos, selected.node, attr
                    )
                } else {
                    return p.commands._updateAttributes(
                        type, attr
                    )
                }


            },
            */
            _updateNodeAttributes: (pos, node, attributes = {}) => ({ tr }) => {
                tr.setNodeMarkup(pos, undefined, {
                    ...node.attrs,
                    ...attributes,
                })

                return true
            },

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
