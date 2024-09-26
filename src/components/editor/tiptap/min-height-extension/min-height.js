import { 
    Extension,
    getAttributes
} from '@tiptap/core'

import {
    extract_tw_attrs,
    render_tw_attrs
} from '../utils'

const minHeights = [
    'min-h-full', 'min-h-screen', 'min-h-svh', 'min-h-lvh', 'min-h-dvh', 
    'min-h-min', 'min-h-max', 'min-h-fit',

    'min-h-0', 'min-h-px', 'min-h-0.5', 'min-h-1', 'min-h-1.5', 'min-h-2', 
    'min-h-2.5', 'min-h-3', 'min-h-3.5', 'min-h-4', 'min-h-5', 'min-h-6', 
    'min-h-7', 'min-h-8', 'min-h-9', 'min-h-10', 'min-h-11', 'min-h-12', 
    'min-h-14', 'min-h-16', 'min-h-20', 'min-h-24', 'min-h-28', 'min-h-32', 
    'min-h-36', 'min-h-40', 'min-h-44', 'min-h-48', 'min-h-52', 'min-h-56', 
    'min-h-60', 'min-h-64', 'min-h-72', 'min-h-80', 'min-h-96', 
]

export const MinHeight = Extension.create({
    name: 'minHeight',

    addOptions() {
        return {
            minHeights: minHeights,
            types: [],
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    minHeight: {
                        default: null,
                        parseHTML: elem => extract_tw_attrs(elem, this.options.minHeights),
                        renderHTML: attrs => render_tw_attrs(attrs, 'minHeight')
                    },
                },
            },
        ]
    },

    addCommands() {
        return {
            setMinHeight: (minHeight, breakpoint=null, type=undefined) => (p) => {
                if (!type) {
                    type = this.options.types.find((e) => p.editor.isActive(e))
                }

                const oldAttrs = p.editor.getAttributes(type)['minHeight']
                const attr = Array.isArray(oldAttrs)
                    ? oldAttrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if (this.options.minHeights.indexOf(minHeight) !== -1) {
                    // New value
                    attr.push({
                        breakpoint: breakpoint,
                        tw: minHeight
                    })
                }

                return p.commands.updateAttributes(
                    type, { minHeight: attr }
                )
            },
        }
    },
})
