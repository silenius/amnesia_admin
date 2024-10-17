import { getMarkType } from '@tiptap/core'
import { getNodeType } from '@tiptap/core'
import { getSchemaTypeNameByName } from '@tiptap/core'
import { Extension } from '@tiptap/core'

export const TipTapCommands = Extension.create({
    name: 'tiptapCommands',
    addCommands() {
        return {
            updateAttributesLast: (typeOrName, attributes = {}) => ({ tr, state, dispatch }) => {
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

                console.log('SELECTION: ', tr.selection)
                if (dispatch) {
                    if (tr.selection.empty && nodeType) {
                        const node = tr.selection.$anchor?.closest(nodeType.name) 

                        if (node) {
                            tr.setNodeMarkup(node.pos-1, null, {
                                ...node.node.attrs,
                                ...attributes,
                            })
                        }
                    } else {
                        tr.selection.ranges.forEach(range => {
                            const from = range.$from.pos
                            const to = range.$to.pos

                            state.doc.nodesBetween(from, to, (node, pos) => {
                                if (nodeType && nodeType === node.type && pos > from && pos < to) {
                                    console.log('==> MATCH ', node, ' POS: ', pos)
                                    tr.setNodeMarkup(pos, undefined, {
                                        ...node.attrs,
                                        ...attributes,
                                    })
                                } else {
                                    console.log('NOT MATCH ', node, ' POS: ', pos)
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
