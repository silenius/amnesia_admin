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
            default_direction: null,
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
            setAlign: (direction, breakpoint=null, type=undefined) => (p) => {
                if (!type) {
                    type = this.options.types.find((e) => p.editor.isActive(e))
                }

                const oldAttrs = p.editor.getAttributes(type)['align']
                const attr = Array.isArray(oldAttrs)
                    ? oldAttrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if (this.options.directions.indexOf(direction) !== -1) {
                    attr.push({
                        breakpoint: breakpoint,
                        tw: direction
                    })
                }


                return p.commands.updateAttributes(
                    type, { align: attr }
                )
            },
        }
    },
})
