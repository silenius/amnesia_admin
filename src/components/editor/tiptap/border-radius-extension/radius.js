import { 
    Extension,
    getAttributes
} from '@tiptap/core'

import {
    extract_tw_attrs,
    render_tw_attrs
} from '../utils'

const radiuses = [
    'rounded-none', 'rounded-xs', 'rounded-sm', 'rounded-md', 'rounded-lg', 
    'rounded-xl', 'rounded-2xl', 'rounded-3xl', 'rounded-full'
]

export const BorderRadius = Extension.create({
    name: 'borderRadius',

    addOptions() {
        return {
            types: [],
            radiuses: radiuses,
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    borderRadius: {
                        default: null,
                        parseHTML: elem => extract_tw_attrs(elem, this.options.radiuses),
                        renderHTML: attrs => render_tw_attrs(attrs, 'borderRadius')
                    },
                },
            },
        ]
    },

    addCommands() {
        return {
            setBorderRadius: ({radius, breakpoint=null, type=undefined, selected=undefined}) => (p) => {
                if (!selected && !type) {
                    type = this.options.types.find((e) => p.editor.isActive(e))
                }

                let attrs = selected ? selected.node.attrs['borderRadius'] : p.editor.getAttributes(type)['borderRadius']

                let attr = Array.isArray(attrs)
                    ? attrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if (this.options.radiuses.indexOf(radius) !== -1) {
                    // New value
                    attr.push({
                        breakpoint: breakpoint,
                        tw: radius
                    })
                }

                attr = {
                    borderRadius: attr
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
