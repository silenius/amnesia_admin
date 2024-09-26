import { 
    Extension,
} from '@tiptap/core'

import {
    render_width_attrs 
} from './utils'

import {
    extract_tw_attrs,
    render_tw_attrs
} from '../utils'

const widths = [
    'w-auto',

    'w-1/2',

    'w-1/3', 'w-2/3',

    'w-1/4', 'w-2/4', 'w-3/4',

    'w-1/5', 'w-2/5', 'w-3/5', 'w-4/5',

    'w-1/6', 'w-2/6', 'w-3/6', 'w-4/6', 'w-5/6',

    'w-1/12', 'w-2/12', 'w-3/12', 'w-4/12', 'w-5/12', 'w-6/12', 'w-7/12',
    'w-8/12', 'w-9/12', 'w-10/12', 'w-11/12',

    'w-full', 'w-screen', 'w-svw', 'w-lvw', 'w-dvw', 'w-min', 'w-max', 'w-fit',

    'w-0', 'w-px', 'w-0.5', 'w-1', 'w-1.5', 'w-2', 'w-2.5', 'w-3', 'w-3.5',
    'w-4', 'w-5', 'w-6', 'w-7', 'w-8', 'w-9', 'w-10', 'w-11', 'w-12', 'w-14',
    'w-16', 'w-20', 'w-24', 'w-28', 'w-32', 'w-36', 'w-40', 'w-44', 'w-48',
    'w-52', 'w-56', 'w-60', 'w-64', 'w-72', 'w-80', 'w-96',
]

export const Width = Extension.create({
    name: 'width',

    addOptions() {
        return {
            widths: widths,
            types: [],
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    width: {
                        default: null,

                        parseHTML: elem => {
                            if (elem.hasAttribute('data-width')) {
                                return JSON.parse(elem.getAttribute('data-width'))
                            } else if (elem.hasAttribute('width')) {
                                return parseFloat(elem.getAttribute('width'))
                            }

                            return extract_tw_attrs(elem, this.options.widths)
                        },

                        renderHTML: attrs => render_tw_attrs(attrs, 'width')
                    },
                },
            },
        ]
    },

    addCommands() {
        return {
            setWidth: (width, breakpoint=null, type=undefined) => (p) => {
                if (!type) {
                    type = this.options.types.find((e) => p.editor.isActive(e))
                }

                const oldAttrs = p.editor.getAttributes(type)['width']
                const attr = Array.isArray(oldAttrs)
                    ? oldAttrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if (this.options.widths.indexOf(width) !== -1) {
                    // New value
                    attr.push({
                        breakpoint: breakpoint,
                        tw: width,
                    })
                }

                return p.commands.updateAttributes(
                    type, { width: attr }
                )
            },
        }
    },
})
