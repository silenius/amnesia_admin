import { 
    Extension,
    getAttributes
} from '@tiptap/core'

import {
    render_font_size_attrs 
} from './utils'

import {
    generate_responsive_cls
} from '../utils'

const sizes = [
    'xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', 
    '8xl', '9xl'
]

const is_font_size = new Set(
    sizes.map((x) => Array.from(generate_responsive_cls(`text-${x}`))).flat()
)

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

                        parseHTML: elem => {
                            const matches = []

                            for (const name of elem.classList) {
                                if (is_font_size.has(name)) {
                                    const size = name.split('-').pop()
                                    const [part1, part2] = name.split(':')
                                    const breakpoint = part2 !== undefined ? part1 : null

                                    matches.push({
                                        size: size,
                                        breakpoint: breakpoint
                                    })
                                }
                            }

                            return matches.length ? matches : null

                        },

                        renderHTML: attrs => {
                            return render_font_size_attrs(attrs)
                        },
                    }
                }
            }
        ]
    },

    addCommands() {
        return {
            setFontSize: (size, breakpoint = null) => (p) => {
                if (
                    p.tr.selection.node?.type.isText === false
                        || this.options.sizes.indexOf(size) === -1
                ) {
                    return null
                }

                const oldAttrs = p.editor.getAttributes('textClass').fontSize
                const mark = Array.isArray(oldAttrs)
                    ? oldAttrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if (size !== 'undefined') {
                    // New value
                    mark.push({
                        breakpoint: breakpoint,
                        size: size
                    })
                }

                return p.chain().setMark(
                    'textClass', {
                        fontSize: mark
                    }
                ).run()

            },
        }
    },
})
