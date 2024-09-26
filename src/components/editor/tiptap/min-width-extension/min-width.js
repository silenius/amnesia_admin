import { 
    Extension,
    getAttributes
} from '@tiptap/core'

import {
    extract_tw_attrs,
    render_tw_attrs
} from '../utils'

const minWidths = [
    'min-w-full', 'min-w-min', 'min-w-max', 'min-w-fit', 

    'min-w-0', 'min-w-px', 'min-w-0.5', 'min-w-1', 'min-w-1.5', 'min-w-2', 
    'min-w-2.5', 'min-w-3', 'min-w-3.5', 'min-w-4', 'min-w-5', 'min-w-6', 
    'min-w-7', 'min-w-8', 'min-w-9', 'min-w-10', 'min-w-11', 'min-w-12', 
    'min-w-14', 'min-w-16', 'min-w-20', 'min-w-24', 'min-w-28', 'min-w-32', 
    'min-w-36', 'min-w-40', 'min-w-44', 'min-w-48', 'min-w-52', 'min-w-56', 
    'min-w-60', 'min-w-64', 'min-w-72', 'min-w-80', 'min-w-96', 
]

export const MinWidth = Extension.create({
    name: 'minWidth',

    addOptions() {
        return {
            minWidths: minWidths,
            types: [],
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    minWidth: {
                        default: null,
                        parseHTML: elem => extract_tw_attrs(elem, this.options.minWidths),
                        renderHTML: attrs => render_tw_attrs(attrs, 'minWidth')
                    },
                },
            },
        ]
    },

    addCommands() {
        return {
            setMinWidth: (minWidth, breakpoint=null, type=undefined) => (p) => {
                if (!type) {
                    type = this.options.types.find((e) => p.editor.isActive(e))
                }

                const oldAttrs = p.editor.getAttributes(type)['minWidth']
                const attr = Array.isArray(oldAttrs)
                    ? oldAttrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if (this.options.minWidths.indexOf(minWidth) !== -1) {
                    // New value
                    attr.push({
                        breakpoint: breakpoint,
                        tw: minWidth
                    })
                }

                return p.commands.updateAttributes(
                    type, { minWidth: attr }
                )
            },
        }
    },
})
