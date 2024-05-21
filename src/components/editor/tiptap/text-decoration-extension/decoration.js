import { 
    Extension,
    getAttributes
} from '@tiptap/core'

import {
    render_text_decoration_attrs 
} from './utils'

import {
    generate_responsive_cls
} from '../utils'

const decorations = ['underline', 'overline', 'line-through', 'no-underline']

const is_decoration = new Set(
    decorations.map((x) => Array.from(generate_responsive_cls(x))).flat()
)

export const TextDecoration = Extension.create({
    name: 'textDecoration',

    addOptions() {
        return {
            types: [],
            decorations: decorations,
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    textDecoration: {
                        default: null,

                        parseHTML: elem => {
                            const matches = []

                            for (const name of elem.classList) {
                                if (is_decoration.has(name)) {
                                    const [part1, part2] = name.split(':')
                                    const breakpoint = part2 !== undefined ? part1 : null
                                    const decoration = breakpoint === null ? part1 : part2

                                    matches.push({
                                        decoration: decoration,
                                        breakpoint: breakpoint
                                    })
                                }
                            }

                            return matches.length ? matches : null

                        },

                        renderHTML: attrs => {
                            return render_text_decoration_attrs(attrs)
                        },
                    },
                },
            },
        ]
    },

    addCommands() {
        return {
            setTextDecoration: (decoration, breakpoint = null) => (p) => {
                if (p.tr.selection.node?.type.isText === false) {
                    return null
                }

                const oldAttrs = p.editor.getAttributes('textClass').textDecoration

                const mark = Array.isArray(oldAttrs)
                    ? oldAttrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if (this.options.decorations.indexOf(decoration) !== -1) {
                    // New value
                    mark.push({
                        breakpoint: breakpoint,
                        decoration: decoration,
                    })
                }

                return p.chain().setMark(
                    'textClass', {
                        textDecoration: mark
                    }
                ).run()
            },

        }
    },
})
