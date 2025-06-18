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
            setFontItalic: ({italic = null, breakpoint = null, type=undefined, selected=undefined}) => (p) => {
                if (!selected && !type) {
                    type = this.options.types.find((e) => p.editor.isActive(e))
                }

                if (p.tr.selection.node?.type.isText === false) {
                    return null
                }

                let attrs = selected ? selected.node.attrs['fontItalic'] : p.editor.getAttributes(type)['fontItalic']

                let attr = Array.isArray(attrs)
                    ? attrs.filter((x) => x.breakpoint !== breakpoint)
                    : []


                if (this.options.italics.indexOf(italic) !== -1) {
                    // New value
                    attr.push({
                        breakpoint: breakpoint,
                        tw: italic,
                    })
                }

                attr = {
                    fontItalic: attr
                }

                if (!p.tr.selection.empty && p.tr.selection.toJSON().type == 'text') {
                    return p.commands.setMark('textClass', attr)
                } else if (selected) {
                    return p.commands._updateNodeAttributes(
                        selected.pos, selected.node, attr
                    )
                } else {
                    return p.commands.updateAttributes(
                        type, attr
                    )
                }
            },
        }
    },

})
