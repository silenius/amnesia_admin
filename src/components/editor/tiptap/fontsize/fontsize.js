import { 
    Extension,
    getAttributes
} from '@tiptap/core'

import {
    extract_tw_attrs,
    render_tw_attrs
} from '../utils'

const sizes = [
    'text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 
    'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl', 'text-7xl', 'text-8xl',
    'text-9xl'
]

export const FontSize = Extension.create({
    name: 'fontSize',

    addOptions() {
        return {
            types: [],
            sizes: sizes
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    fontSize: {
                        default: null,
                        parseHTML: elem => extract_tw_attrs(elem, this.options.sizes),
                        renderHTML: attrs => render_tw_attrs(attrs, 'fontSize')
                    }
                }
            }
        ]
    },

    addCommands() {
        return {
            setFontSize: (size, breakpoint = null) => (p) => {
                if (p.tr.selection.node?.type.isText === false) {
                    return null
                }

                const oldAttrs = p.editor.getAttributes('textClass').fontSize
                const mark = Array.isArray(oldAttrs)
                    ? oldAttrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if (this.options.sizes.indexOf(size) !== -1) {
                    // New value
                    mark.push({
                        breakpoint: breakpoint,
                        tw: size
                    })
                }

                return p.chain().setMark(
                    'textClass', {
                        fontSize: mark
                    }
                ).run()
            }
        }
    },
})
