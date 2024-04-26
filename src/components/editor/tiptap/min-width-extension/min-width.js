import { 
    Extension,
    getAttributes
} from '@tiptap/core'

import {
    render_minWidth_attrs 
} from './utils'

import {
    generate_responsive_cls
} from '../utils'

const minWidths = [
    'full', 'min', 'max', 'fit', 

    '0', 'px', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6', '7',
    '8', '9', '10', '11', '12', '14', '16', '20', '24', '28', '32', '36', 
    '40', '44', '48', '52', '56', '60', '64', '72', '80', '96', 
    
]

export const MinWidth = Extension.create({
    name: 'minWidth',

    addOptions() {
        return {
            minWidths: minWidths,
            types: [],
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    minWidth: {
                        default: null,
                        
                        parseHTML: elem => {
                            const is_minWidth = new Set(
                                this.options.minWidths.map(
                                    (x) => Array.from(generate_responsive_cls(`min-w-${x}`))
                                ).flat()
                            )

                            const matches = []

                            for (const name of elem.classList) {
                                if (is_minWidth.has(name)) {
                                    const minWidth = name.split('-').pop()
                                    const [part1, part2] = name.split(':')
                                    const breakpoint = part2 !== undefined ? part1 : null

                                    matches.push({
                                        minWidth: minWidth,
                                        breakpoint: breakpoint
                                    })
                                }
                            }

                            return matches.length ? matches : null

                        },
                        
                        renderHTML: attrs => {
                            return render_minWidth_attrs(attrs)
                        },
                    },
                },
            },
        ]
    },

    addCommands() {
        return {
            setMinWidth: (minWidth, breakpoint = null) => (p) => {
                const type = p.editor.isActive('image') ? 'image' : 'paragraph'
                const oldAttrs = getAttributes(p.state, type)['minWidth']
                const mark = Array.isArray(oldAttrs)
                    ? oldAttrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if (minWidth !== 'undefined') {
                    // New value
                    mark.push({
                        breakpoint: breakpoint,
                        minWidth: minWidth
                    })
                }

                return p.commands.updateAttributes(
                    type, { minWidth: mark }
                )
            },
        }
    },
})
