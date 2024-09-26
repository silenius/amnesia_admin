import { 
    Extension,
} from '@tiptap/core'

import {
    extract_tw_attrs,
    render_tw_attrs
} from '../utils'

const heights = [
    'h-auto', 

    'h-1/2', 

    'h-1/3', 'h-2/3', 

    'h-1/4', 'h-2/4', 'h-3/4', 

    'h-1/5', 'h-2/5', 'h-3/5', 'h-4/5', 

    'h-1/6', 'h-2/6', 'h-3/6', 'h-4/6', 'h-5/6', 

    'h-full', 'h-screen', 'h-svh', 'h-lvh', 'h-dvh', 'h-min', 'h-max', 'h-fit', 

    'h-0', 'h-px', 'h-0.5', 'h-1', 'h-1.5', 'h-2', 'h-2.5', 'h-3', 'h-3.5', 
    'h-4', 'h-5', 'h-6', 'h-7', 'h-8', 'h-9', 'h-10', 'h-11', 'h-12', 'h-14',
    'h-16', 'h-20', 'h-24', 'h-28', 'h-32', 'h-36', 'h-40', 'h-44', 'h-48', 
    'h-52', 'h-56', 'h-60', 'h-64', 'h-72', 'h-80', 'h-96', 
]

export const Height = Extension.create({
    name: 'height',

    addOptions() {
        return {
            heights: heights,
            types: [],
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    height: {
                        default: null,

                        parseHTML: elem => {
                            if (elem.hasAttribute('data-height')) {
                                return JSON.parse(elem.getAttribute('data-height'))
                            } else if (elem.hasAttribute('height')) {
                                return parseFloat(elem.getAttribute('height'))
                            }

                            return extract_tw_attrs(elem, this.options.heights)
                        },

                        renderHTML: attrs => render_tw_attrs(attrs, 'height')
                    },
                },
            },
        ]
    },

    addCommands() {
        return {
            setHeight: (height, breakpoint=null, type=undefined) => (p) => {
                if (!type) {
                    type = this.options.types.find((e) => p.editor.isActive(e))
                }

                const oldAttrs = p.editor.getAttributes(type)['height']
                const attr = Array.isArray(oldAttrs)
                    ? oldAttrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if (this.options.heights.indexOf(height) !== -1) {
                    // New value
                    attr.push({
                        breakpoint: breakpoint,
                        tw: height,
                    })
                }

                return p.commands.updateAttributes(
                    type, { height: attr }
                )
            },
        }
    },
})
