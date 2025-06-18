import { 
    Extension,
    getAttributes
} from '@tiptap/core'

import {
    extract_tw_attrs,
    render_tw_attrs
} from '../utils'

const decorations = ['underline', 'overline', 'line-through', 'no-underline']

export const TextDecoration = Extension.create({
    name: 'textDecoration',

    addOptions() {
        return {
            types: [],
            decorations: decorations,
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    textDecoration: {
                        default: null,
                        parseHTML: elem => extract_tw_attrs(elem, this.options.decorations),
                        renderHTML: attrs => render_tw_attrs(attrs, 'textDecoration')
                    },
                },
            },
        ]
    },

    addCommands() {
        return {
            setTextDecoration: ({decoration = null, breakpoint = null, type = undefined, selected = undefined}) => (p) => {
                if (!selected && !type) {
                    type = this.options.types.find((e) => p.editor.isActive(e))
                }

                if (p.tr.selection.node?.type.isText === false) {
                    return null
                }

                let attrs = selected ? selected.node.attrs['textDecoration'] : p.editor.getAttributes(type)['textDecoration']

                let attr = Array.isArray(attrs)
                    ? attrs.filter((x) => x.breakpoint !== breakpoint)
                    : []


                if (this.options.decorations.indexOf(decoration) !== -1) {
                    // New value
                    attr.push({
                        breakpoint: breakpoint,
                        tw: decoration,
                    })
                }

                attr = {
                    textDecoration: attr
                }

                if (!p.tr.selection.empty && p.tr.selection.toJSON().type == 'text') {
                    return p.commands.setMark('textClass', attr)
                } else if (selected) {
                    return p.commands._updateNodeAttributes(
                        selected.pos, selected.node, attr
                    )
                } else {
                    return p.commands.updateAttributes(
                        type, attr
                    )
                }
            },
        }
    },
})
