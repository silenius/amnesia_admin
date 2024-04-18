import { 
    Extension,
    getAttributes
} from '@tiptap/core'

import {
    render_font_italic_attrs 
} from './utils'

import {
    generate_responsive_cls
} from '../utils'

const italics = ['italic', 'not-italic']

const is_font_italic = new Set([
    ...italics.map((x) => generate_responsive_cls(x))
].flat())

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

                        parseHTML: elem => {
                            const matches = []

                            for (const name of elem.classList) {
                                if (is_font_italic.has(name)) {
                                    // md:not-italic, not-italic, italic,
                                    // lg:italic, etc
                                    const [part1, part2] = name.split(':')
                                    const breakpoint = part2 !== undefined ? part1 : null
                                    const italic = breakpoint === null ? part1 : part2

                                    matches.push({
                                        italic: italic,
                                        breakpoint: breakpoint
                                    })
                                }
                            }

                            return matches.length ? matches : null

                        },

                        renderHTML: attrs => {
                            return render_font_italic_attrs(attrs)
                        },
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

                const oldAttrs = getAttributes(p.state, 'textClass').fontItalic

                const mark = Array.isArray(oldAttrs)
                    ? oldAttrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if (this.options.italics.indexOf(italic) !== -1) {
                    // New value
                    mark.push({
                        breakpoint: breakpoint,
                        italic: italic,
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
