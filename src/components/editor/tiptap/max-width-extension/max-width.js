import { 
    Extension,
    getAttributes
} from '@tiptap/core'

import {
    extract_tw_attrs,
    render_tw_attrs
} from '../utils'

const maxWidths = [
    'max-w-none', 

    'max-w-xs', 'max-w-sm', 'max-w-md', 'max-w-lg', 'max-w-xl', 'max-w-2xl', 
    'max-w-3xl', 'max-w-4xl', 'max-w-5xl', 'max-w-6xl', 'max-w-7xl',

    'max-w-full', 'max-w-min', 'max-w-max', 'max-w-fit', 'max-w-prose',

    'max-w-screen-sm', 'max-w-screen-md', 'max-w-screen-lg', 'max-w-screen-xl',
    'max-w-screen-2xl',

    'max-w-0', 'max-w-px', 'max-w-0.5', 'max-w-1', 'max-w-1.5', 'max-w-2', 
    'max-w-2.5', 'max-w-3', 'max-w-3.5', 'max-w-4', 'max-w-5', 'max-w-6', 
    'max-w-7', 'max-w-8', 'max-w-9', 'max-w-10', 'max-w-11', 'max-w-12', 
    'max-w-14', 'max-w-16', 'max-w-20', 'max-w-24', 'max-w-28', 'max-w-32', 
    'max-w-36', 'max-w-40', 'max-w-44', 'max-w-48', 'max-w-52', 'max-w-56', 
    'max-w-60', 'max-w-64', 'max-w-72', 'max-w-80', 'max-w-96', 
]

export const MaxWidth = Extension.create({
    name: 'maxWidth',

    addOptions() {
        return {
            maxWidths: maxWidths,
            types: [],
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    maxWidth: {
                        default: null,
                        parseHTML: elem => extract_tw_attrs(elem, this.options.maxWidths),
                        renderHTML: attrs => render_tw_attrs(attrs, 'maxWidth')
                    },
                },
            },
        ]
    },

    addCommands() {
        return {
            setMaxWidth: (maxWidth, breakpoint=null, type=undefined) => (p) => {
                if (!type) {
                    type = this.options.types.find((e) => p.editor.isActive(e))
                }

                const oldAttrs = p.editor.getAttributes(type)['maxWidth']
                const mark = Array.isArray(oldAttrs)
                    ? oldAttrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if (this.options.maxWidths.indexOf(maxWidth) !== -1) {
                    // New value
                    mark.push({
                        breakpoint: breakpoint,
                        tw: maxWidth
                    })
                }

                return p.commands.updateAttributes(
                    type, { maxWidth: mark }
                )
            },
        }
    },
})
