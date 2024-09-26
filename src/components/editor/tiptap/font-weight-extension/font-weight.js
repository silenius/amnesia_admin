import { 
    Extension,
    getAttributes
} from '@tiptap/core'

import {
    extract_tw_attrs,
    render_tw_attrs
} from '../utils'

const weights = [
    'font-thin', 'font-extralight', 'font-light', 'font-normal', 'font-medium',
    'font-semibold', 'font-bold', 'font-extrabold', 'font-black'
]

export const FontWeight = Extension.create({
    name: 'fontWeight',

    addOptions() {
        return {
            types: [],
            weights: weights
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    fontWeight: {
                        default: null,
                        parseHTML: elem => extract_tw_attrs(elem, this.options.weights),
                        renderHTML: attrs => render_tw_attrs(attrs, 'fontWeight')
                    },
                },
            },
        ]
    },

    addCommands() {
        return {
            setFontWeight: (weight, breakpoint = null) => (p) => {
                if (
                    p.tr.selection.node?.type.isText === false
                ) {
                    return null
                }

                const oldAttrs = p.editor.getAttributes('textClass')['fontWeight']

                const attr = Array.isArray(oldAttrs)
                    ? oldAttrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if (this.options.weights.indexOf(weight) !== -1) {
                    // New value
                    attr.push({
                        breakpoint: breakpoint,
                        tw: weight
                    })
                }

                return p.chain().setMark(
                    'textClass', {
                        fontWeight: attr
                    }
                ).run()
            },
        }
    },

})
