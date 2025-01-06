import { 
    Extension,
    getAttributes
} from '@tiptap/core'

import {
    extract_tw_attrs,
    render_tw_attrs
} from '../utils'

const clears = [
    'clear-right', 'clear-left', 'clear-both', 'clear-none'
]

export const Clear = Extension.create({
    name: 'clear',

    addOptions() {
        return {
            types: [],
            clears: clears,
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    clear: {
                        default: null,
                        parseHTML: elem => extract_tw_attrs(elem, this.options.clears),
                        renderHTML: attrs => render_tw_attrs(attrs, 'clear')
                    },
                },
            },
        ]
    },

    addCommands() {
        return {
            setClear: ({clear, breakpoint=null, type=undefined, selected=undefined}) => (p) => {
                if (!selected && !type) {
                    type = this.options.types.find((e) => p.editor.isActive(e))
                }

                let attrs = selected ? selected.node.attrs['clear'] : p.editor.getAttributes(type)['clear']

                let attr = Array.isArray(attrs)
                    ? attrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if (this.options.clears.indexOf(clear) !== -1) {
                    // New value
                    attr.push({
                        breakpoint: breakpoint,
                        tw: clear
                    })
                }

                attr = {
                    clear: attr
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
            }
        }
    }
})
