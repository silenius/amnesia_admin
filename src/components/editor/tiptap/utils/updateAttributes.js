import { getMarkType } from '@tiptap/core'
import { getNodeType } from '@tiptap/core'
import { getSchemaTypeNameByName } from '@tiptap/core'
import { Extension } from '@tiptap/core'

export const TipTapCommands = Extension.create({
    name: 'tiptapCommands',
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
                    /*
                     * If the user didn't select anything then start from the
                     * current cursor, grab a NodePos, and find the closest 
                     * typeOrName from that NodePos
                     */
                    if (tr.selection.empty) {
                        // get a NodePos
                        const pos = this.editor.$pos(tr.selection.anchor)
                        const node = pos.closest(nodeType.name) 

                        if (nodeType && nodeType === node.type) {
                            tr.setNodeMarkup(node.pos-1, null, {
                                ...node.node.attrs,
                                ...attributes,
                            })
                        }

                        // FIXME
                        if (markType && node.marks.length) {
                            node.marks.forEach(mark => {
                                if (markType === mark.type) {
                                    tr.addMark(
                                        pos,
                                        pos.node.nodeSize,
                                        markType.create({
                                            ...mark.attrs,
                                            ...attributes,
                                        }),
                                    )
                                }
                            })
                        }
                    } else {
                        tr.selection.ranges.forEach(range => {
                            /* If we have typeOrName == flexItem and something
                             * like the following in the editor:
                             * <someflexItemTag>
                             *   <p>foo</p><p>bar</p>
                             * </someflexItemTag>
                             * 
                             * If we (text) select "ooba" from that part in 
                             * the editor the selection range would not include
                             * the flexItem, so be sure to start from that node
                             * pos.
                             *
                             * I'm not sure that this is the best way to do it
                             * but.. it works. (I've to check the 
                             * prosemirror/tiptap documentation)
                             */
                            const from = this.editor.$pos(
                                range.$from.pos
                            ).closest(nodeType.name).pos - 1

                            const to = range.$to.pos

                            state.doc.nodesBetween(from, to, (node, pos) => {
                                if (nodeType && nodeType === node.type && pos >= from && pos <= to) {
                                    tr.setNodeMarkup(pos, undefined, {
                                        ...node.attrs,
                                        ...attributes,
                                    })
                                }

                                if (markType && node.marks.length) {
                                    node.marks.forEach(mark => {
                                        if (markType === mark.type) {
                                            const trimmedFrom = Math.max(pos, from)
                                            const trimmedTo = Math.min(pos + node.nodeSize, to)

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
                            })
                        })
                    }
                }

                /*

                if (dispatch) {
                    let lastPos
                    let lastNode
                    let trimmedFrom
                    let trimmedTo

                    console.log(tr)

                    tr.selection.ranges.forEach(range => {
                        const from = range.$from.pos
                        const to = range.$to.pos

                        state.doc.nodesBetween(from, to, (node, pos) => {
                            if (nodeType && nodeType === node.type) {
                                trimmedFrom = Math.max(pos, from)
                                trimmedTo = Math.min(pos + node.nodeSize, to)
                                lastPos = pos
                                lastNode = node
                            }
                        })
                    })

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
                }
*/
                return true
            }
        }
    }
})

export default TipTapCommands
