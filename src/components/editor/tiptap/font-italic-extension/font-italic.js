import { 
    Extension,
    getAttributes
} from '@tiptap/core'

import {
    render_font_italic_attrs 
} from './utils'

import {
    extract_tw_attrs,
    render_tw_attrs
} from '../utils'

const italics = [
    'italic', 'not-italic'
]

export const FontItalic = Extension.create({
    name: 'fontItalic',

    addOptions() {
        return {
            types: [],
            italics: italics
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    fontItalic: {
                        default: null,
                        parseHTML: elem => extract_tw_attrs(elem, this.options.italics),
                        renderHTML: attrs => render_tw_attrs(attrs, 'fontItalic')
                    },
                },
            },
        ]
    },

    addCommands() {
        return {
            setFontItalic: (italic = null, breakpoint = null) => (p) => {
                if (p.tr.selection.node?.type.isText === false) {
                    return null
                }

                const oldAttrs = p.editor.getAttributes('textClass').fontItalic

                const mark = Array.isArray(oldAttrs)
                    ? oldAttrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if (this.options.italics.indexOf(italic) !== -1) {
                    // New value
                    mark.push({
                        breakpoint: breakpoint,
                        tw: italic,
                    })
                }

                return p.chain().setMark(
                    'textClass', {
                        fontItalic: mark
                    }
                ).run()
            },
        }
    },

})
