import { 
    Extension,
    getAttributes
} from '@tiptap/core'

import {
    extract_tw_attrs,
    render_tw_attrs
} from '../utils'

const aligns = [
    'text-left', 'text-center', 'text-right', 'text-justify'
]

export const Align = Extension.create({
    name: 'align',

    addOptions() {
        return {
            types: [],
            aligns: aligns,
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    align: {
                        default: null,
                        parseHTML: elem => extract_tw_attrs(elem, this.options.aligns),
                        renderHTML: attrs => render_tw_attrs(attrs, 'align')
                    },
                },
            },
        ]
    },

    addCommands() {
        return {
            setAlign: ({align, breakpoint=null, type=undefined, selected=undefined}) => (p) => {
                if (!selected && !type) {
                    type = this.options.types.find((e) => p.editor.isActive(e))
                }

                let attrs = selected ? selected.node.attrs['align'] : p.editor.getAttributes(type)['align']

                let attr = Array.isArray(attrs)
                    ? attrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if (this.options.aligns.indexOf(align) !== -1) {
                    // New value
                    attr.push({
                        breakpoint: breakpoint,
                        tw: align
                    })
                }

                attr = {
                    align: attr
                }

                if (!p.editor.state.selection.empty) {
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
        }
    },
})
