import { 
    Extension,
} from '@tiptap/core'

import {
    render_height_attrs 
} from './utils'

import {
    generate_responsive_cls
} from '../utils'

const heights = [
    'auto', 
    
    '1/2', 
    
    '1/3', '2/3', 
    
    '1/4', '2/4', '3/4', 
    
    '1/5', '2/5', '3/5', '4/5', 
    
    '1/6', '2/6', '3/6', '4/6', '5/6', 
    
    '1/12', '2/12', '3/12', '4/12', '5/12', '6/12', '7/12', '8/12', '9/12', 
    '10/12', '11/12', 
    
    'full', 'screen', 'svh', 'lvh', 'dvh', 'min', 'max', 'fit', 

    '0', 'px', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6', '7',
    '8', '9', '10', '11', '12', '14', '16', '20', '24', '28', '32', '36', 
    '40', '44', '48', '52', '56', '60', '64', '72', '80', '96', 
    
]

export const Height = Extension.create({
    name: 'height',

    addOptions() {
        return {
            heights: heights,
            types: [],
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    height: {
                        default: null,

                        parseHTML: elem => {
                            if (elem.tagName.toLowerCase().startsWith('amnesia-')) {
                                if (elem.hasAttribute('data-height')) {
                                    return JSON.parse(elem.getAttribute('data-height'))
                                } else if (elem.hasAttribute('height')) {
                                    return parseFloat(elem.getAttribute('height'))
                                }
                            }

                            const is_height = new Set(
                                this.options.heights.map(
                                    (x) => Array.from(generate_responsive_cls(`h-${x}`))
                                ).flat()
                            )

                            const matches = []

                            for (const name of elem.classList) {
                                if (is_height.has(name)) {
                                    const height = name.split('-').pop()
                                    const [part1, part2] = name.split(':')
                                    const breakpoint = part2 !== undefined ? part1 : null

                                    matches.push({
                                        height: height,
                                        breakpoint: breakpoint
                                    })
                                }
                            }

                            return matches.length ? matches : null

                        },
                        
                        renderHTML: attrs => {
                            return render_height_attrs(attrs)
                        },
                    },
                },
            },
        ]
    },

    addCommands() {
        return {
            setHeight: (height, breakpoint=null, raw=false) => (p) => {
                const type = this.options.types.find((e) => p.editor.isActive(e))
                const oldAttrs = p.editor.getAttributes(type)['height']
                const mark = Array.isArray(oldAttrs)
                    ? oldAttrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if (height !== 'undefined') {
                    // New value
                    mark.push({
                        breakpoint: breakpoint,
                        height: height,
                        raw: raw
                    })
                }

                return p.commands.updateAttributes(
                    type, { height: mark }
                )
            },
        }
    },
})
