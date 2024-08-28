import { 
    Extension,
    getAttributes
} from '@tiptap/core'

import {
    render_gapX_attrs,
    render_gapY_attrs,
} from './utils'

import {
    generate_responsive_cls
} from '../utils'

const gaps = [
    '0', 'px', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6', '7',
    '8', '9', '10', '11', '12', '14', '16', '20', '24', '28', '32', '36', '40',
    '44', '48', '52', '56', '60', '64', '72', '80', '96'
]


export const Gap = Extension.create({
    name: 'gap',

    addOptions() {
        return {
            types: ['flexContainer'],
            gaps: gaps
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    gapX: {
                        default: null,
                        
                        parseHTML: elem => {
                            const is_gap = new Set(
                                this.options.gaps.map(
                                    (x) => Array.from(generate_responsive_cls(`gap-x-${x}`))
                                ).flat()
                            )

                            const matches = []

                            for (const name of elem.classList) {
                                if (is_gap.has(name)) {
                                    const result = name.split('-')
                                    const [part1, part2] = result[0].split(':')
                                    const breakpoint = part2 !== undefined ? part1 : null
                                    const gap = result.slice(2).join('-')

                                    matches.push({
                                        gap: gap,
                                        breakpoint: breakpoint
                                    })
                                }
                            }

                            return matches.length ? matches : null
                        },
                        
                        renderHTML: attrs => {
                            return render_gapX_attrs(attrs)
                        },
                    },

                    gapY: {
                        default: null,
                        
                        parseHTML: elem => {
                            const is_gap = new Set(
                                this.options.gaps.map(
                                    (x) => Array.from(generate_responsive_cls(`gap-y-${x}`))
                                ).flat()
                            )

                            const matches = []

                            for (const name of elem.classList) {
                                if (is_gap.has(name)) {
                                    const result = name.split('-')
                                    const [part1, part2] = result[0].split(':')
                                    const breakpoint = part2 !== undefined ? part1 : null
                                    const gap = result.slice(2).join('-')

                                    matches.push({
                                        gap: gap,
                                        breakpoint: breakpoint
                                    })
                                }
                            }

                            return matches.length ? matches : null
                        },
                        
                        renderHTML: attrs => {
                            return render_gapY_attrs(attrs)
                        },
                    },
                },
            },
        ]
    },

    addCommands() {
        return {
            setGap: (side, gap, breakpoint = null) => (p) => {
                const type = this.options.types.find((e) => p.editor.isActive(e))
                const oldAttrs = p.editor.getAttributes(type)[side]
                const attr = Array.isArray(oldAttrs)
                    ? oldAttrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if (this.options.gaps.indexOf(gap) !== -1) {
                    // New value
                    attr.push({
                        breakpoint: breakpoint,
                        gap: gap,
                    })
                }

                console.log(side)
                console.log(attr)
                console.log(Object.fromEntries([[`${side}`, attr ]]))

                return p.commands.updateAttributes(
                    type, Object.fromEntries([[`${side}`, attr ]])
                )
            },
        }
    },
})
