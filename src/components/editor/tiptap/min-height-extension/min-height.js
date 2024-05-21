import { 
    Extension,
    getAttributes
} from '@tiptap/core'

import {
    render_minHeight_attrs 
} from './utils'

import {
    generate_responsive_cls
} from '../utils'

const minHeights = [
    'full', 'screen', 'svh', 'lvh', 'dvh', 'min', 'max', 'fit',

    '0', 'px', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6', '7',
    '8', '9', '10', '11', '12', '14', '16', '20', '24', '28', '32', '36', 
    '40', '44', '48', '52', '56', '60', '64', '72', '80', '96', 
    
]

export const MinHeight = Extension.create({
    name: 'minHeight',

    addOptions() {
        return {
            minHeights: minHeights,
            types: [],
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    minHeight: {
                        default: null,
                        
                        parseHTML: elem => {
                            const is_minHeight = new Set(
                                this.options.minHeights.map(
                                    (x) => Array.from(generate_responsive_cls(`min-h-${x}`))
                                ).flat()
                            )

                            const matches = []

                            for (const name of elem.classList) {
                                if (is_minHeight.has(name)) {
                                    const minHeight = name.split('-').pop()
                                    const [part1, part2] = name.split(':')
                                    const breakpoint = part2 !== undefined ? part1 : null

                                    matches.push({
                                        minHeight: minHeight,
                                        breakpoint: breakpoint
                                    })
                                }
                            }

                            return matches.length ? matches : null

                        },
                        
                        renderHTML: attrs => {
                            return render_minHeight_attrs(attrs)
                        },
                    },
                },
            },
        ]
    },

    addCommands() {
        return {
            setMinHeight: (minHeight, breakpoint = null) => (p) => {
                const type = this.options.types.find((e) => p.editor.isActive(e))
                const oldAttrs = p.editor.getAttributes(type)['minHeight']
                const mark = Array.isArray(oldAttrs)
                    ? oldAttrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if (minHeight !== 'undefined') {
                    // New value
                    mark.push({
                        breakpoint: breakpoint,
                        minHeight: minHeight
                    })
                }

                return p.commands.updateAttributes(
                    type, { minHeight: mark }
                )
            },
        }
    },
})
