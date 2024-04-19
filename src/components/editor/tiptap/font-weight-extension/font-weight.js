import { 
    Extension,
    getAttributes
} from '@tiptap/core'

import {
    render_font_weight_attrs 
} from './utils'

import {
    generate_responsive_cls
} from '../utils'

const weights = [
    'thin', 'extralight', 'light', 'normal', 'medium', 
    'semibold', 'bold', 'extrabold', 'black'
]

const is_font_weight = new Set(
    weights.map((x) => Array.from(generate_responsive_cls(`font-${x}`))).flat()
)

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

                        parseHTML: elem => {
                            const matches = []

                            for (const name of elem.classList) {
                                if (is_font_weight.has(name)) {
                                    const direction = name.split('-').pop()
                                    const [part1, part2] = name.split(':')
                                    const breakpoint = part2 !== undefined ? part1 : null

                                    matches.push({
                                        weight: direction,
                                        breakpoint: breakpoint
                                    })
                                }
                            }

                            return matches.length ? matches : null

                        },

                        renderHTML: attrs => {
                            return render_font_weight_attrs(attrs)
                        },
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
                        || this.options.weights.indexOf(weight) === -1
                ) {
                    return null
                }

                const oldAttrs = getAttributes(p.state, 'textClass').fontWeight
                const newAttrs = {
                    breakpoint: breakpoint,
                    weight: weight, 
                }

                let mark

                if (Array.isArray(oldAttrs)) {
                    mark = oldAttrs.filter((x) => x.breakpoint !== breakpoint)
                    mark.push(newAttrs)
                } else {
                    mark = [newAttrs]
                }

                return p.chain().setMark(
                    'textClass', {
                        fontWeight: mark
                    }
                ).run()
            },
        }
    },

})
