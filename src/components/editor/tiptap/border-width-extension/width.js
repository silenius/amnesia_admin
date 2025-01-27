import { 
    Extension,
    getAttributes
} from '@tiptap/core'

import {
    extract_tw_attrs,
    render_tw_attrs
} from '../utils'

const widths = [
    'border-0', 'border', 'border-2', 'border-4', 'border-8'
]

export const Float = Extension.create({
    name: 'borderWidth',

    addOptions() {
        return {
            types: [],
            widths: widths,
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    borderWidth: {
                        default: null,
                        parseHTML: elem => extract_tw_attrs(elem, this.options.widths),
                        renderHTML: attrs => render_tw_attrs(attrs, 'borderWidth')
                    },
                },
            },
        ]
    },

    addCommands() {
        return {
            setBorderWidth: ({width, breakpoint=null, type=undefined, selected=undefined}) => (p) => {
                if (!selected && !type) {
                    type = this.options.types.find((e) => p.editor.isActive(e))
                }

                let attrs = selected ? selected.node.attrs['borderWidth'] : p.editor.getAttributes(type)['borderWidth']

                let attr = Array.isArray(attrs)
                    ? attrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if (this.options.widths.indexOf(width) !== -1) {
                    // New value
                    attr.push({
                        breakpoint: breakpoint,
                        tw: width
                    })
                }

                attr = {
                    borderWidth: attr
                }

                if (!p.editor.state.selection.empty) {
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
