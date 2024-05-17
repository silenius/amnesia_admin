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
                    let lastPos = null
                    let lastNode = null
                    let trimmedFrom = null
                    let trimmedTo = null

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

                    if (lastPos !== null && lastNode !== null) {
                        tr.setNodeMarkup(lastPos, undefined, {
                            ...lastNode.attrs,
                            ...attributes,
                        })
                    }

                    if (markType && lastNode?.marks.length) {
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

                return true
            }
        }
    }
})

export default TipTapCommands
