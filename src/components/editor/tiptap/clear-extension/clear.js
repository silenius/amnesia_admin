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
            setClear: (clear, breakpoint = null) => (p) => {
                if (!type) {
                    type = this.options.types.find((e) => p.editor.isActive(e))
                }
                const oldAttrs = p.editor.getAttributes(type)['clear']

                const attr = Array.isArray(oldAttrs)
                    ? oldAttrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if (this.options.clears.indexOf(clear) !== -1) {
                    // New value
                    attr.push({
                        breakpoint: breakpoint,
                        tw: clear
                    })
                }

                return p.commands.updateAttributes(
                    type, { clear: attr }
                )
            },
        }
    },
})
