import { 
    Extension,
    getAttributes
} from '@tiptap/core'

import {
    extract_tw_attrs,
    render_tw_attrs
} from '../utils'

const maxHeights = [
    'max-h-none',

    'max-h-full', 'max-h-screen', 'max-h-svh', 'max-h-lvh', 'max-h-dvh',
    'max-h-min', 'max-h-max', 'max-h-fit',

    'max-h-0', 'max-h-px', 'max-h-0.5', 'max-h-1', 'max-h-1.5', 'max-h-2',
    'max-h-2.5', 'max-h-3', 'max-h-3.5', 'max-h-4', 'max-h-5', 'max-h-6',
    'max-h-7', 'max-h-8', 'max-h-9', 'max-h-10', 'max-h-11', 'max-h-12',
    'max-h-14', 'max-h-16', 'max-h-20', 'max-h-24', 'max-h-28', 'max-h-32',
    'max-h-36', 'max-h-40', 'max-h-44', 'max-h-48', 'max-h-52', 'max-h-56',
    'max-h-60', 'max-h-64', 'max-h-72', 'max-h-80', 'max-h-96',
]

export const MaxHeight = Extension.create({
    name: 'maxHeight',

    addOptions() {
        return {
            maxHeights: maxHeights,
            types: [],
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    maxHeight: {
                        default: null,
                        parseHTML: elem => extract_tw_attrs(elem, this.options.maxHeights),
                        renderHTML: attrs => render_tw_attrs(attrs, 'maxHeight')
                    },
                },
            },
        ]
    },

    addCommands() {
        return {
            setMaxHeight: (maxHeight, breakpoint=null, type=undefined) => (p) => {
                if (!type) {
                    type = this.options.types.find((e) => p.editor.isActive(e))
                }

                const oldAttrs = p.editor.getAttributes(type)['maxHeight']
                const mark = Array.isArray(oldAttrs)
                    ? oldAttrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if (this.options.maxHeights.indexOf(maxHeight) !== -1) {
                    // New value
                    mark.push({
                        breakpoint: breakpoint,
                        tw: maxHeight
                    })
                }

                return p.commands.updateAttributes(
                    type, { maxHeight: mark }
                )
            },
        }
    },
})
