import { 
    Extension,
    getAttributes
} from '@tiptap/core'

import {
    render_maxHeight_attrs 
} from './utils'

import {
    generate_responsive_cls
} from '../utils'

const maxHeights = [
    'none', 

    'full', 'screen', 'svh', 'lvh', 'dvh', 'min', 'max', 'fit',

    '0', 'px', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6', '7',
    '8', '9', '10', '11', '12', '14', '16', '20', '24', '28', '32', '36', 
    '40', '44', '48', '52', '56', '60', '64', '72', '80', '96', 
    
]

export const MaxHeight = Extension.create({
    name: 'maxHeight',

    addOptions() {
        return {
            maxHeights: maxHeights,
            types: [],
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    maxHeight: {
                        default: null,
                        
                        parseHTML: elem => {
                            const is_maxHeight = new Set(
                                this.options.maxHeights.map(
                                    (x) => Array.from(generate_responsive_cls(`max-h-${x}`))
                                ).flat()
                            )

                            const matches = []

                            for (const name of elem.classList) {
                                if (is_maxHeight.has(name)) {
                                    const maxHeight = name.split('-').pop()
                                    const [part1, part2] = name.split(':')
                                    const breakpoint = part2 !== undefined ? part1 : null

                                    matches.push({
                                        maxHeight: maxHeight,
                                        breakpoint: breakpoint
                                    })
                                }
                            }

                            return matches.length ? matches : null

                        },
                        
                        renderHTML: attrs => {
                            return render_maxHeight_attrs(attrs)
                        },
                    },
                },
            },
        ]
    },

    addCommands() {
        return {
            setMaxHeight: (maxHeight, breakpoint=null, type=undefined) => (p) => {
                if (!type) {
                    type = this.options.types.find((e) => p.editor.isActive(e))
                }

                const oldAttrs = p.editor.getAttributes(type)['maxHeight']
                const mark = Array.isArray(oldAttrs)
                    ? oldAttrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if (maxHeight !== 'undefined') {
                    // New value
                    mark.push({
                        breakpoint: breakpoint,
                        maxHeight: maxHeight
                    })
                }

                return p.commands.updateAttributes(
                    type, { maxHeight: mark }
                )
            },
        }
    },
})
