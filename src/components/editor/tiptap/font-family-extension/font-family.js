import {
    Extension,
    getAttributes
} from '@tiptap/core'

import {
    extract_tw_attrs,
    render_tw_attrs
} from '../utils'

const families = [
    'sans', 'serif', 'mono'
]

export const FontFamily = Extension.create({
    name: 'fontFamily',

    addOptions() {
        return {
            types: [],
            families: families
        }

    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    fontFamily: {
                        default: null,
                        parseHTML: elem => extract_tw_attrs(elem, this.options.families, 'font-'),
                        renderHTML: attrs => render_tw_attrs(attrs, 'fontFamily')

                    },
                },
            },
        ]
    },

    addCommands() {
        return {
            setFontFamily: (family, breakpoint = null) => (p) => {
                if (p.tr.selection.node?.type.isText === false) {
                    return null
                }

                const oldAttrs = p.editor.getAttributes('textClass').fontFamily
                const attr = Array.isArray(oldAttrs)
                    ? oldAttrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if (this.options.families.indexOf(family) !== -1) {
                    // New value
                    attr.push({
                        breakpoint: breakpoint,
                        tw: `font-${family}`
                    })
                }

                return p.chain().setMark(
                    'textClass', {
                        fontFamily: attr
                    }
                ).run()
            },
        }
    },
})
