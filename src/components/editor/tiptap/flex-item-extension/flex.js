import {
    mergeAttributes,
    Node
} from '@tiptap/core'

import {
    render_basis_attrs,
    render_flex_attrs,
} from './utils'

import {
    generate_responsive_cls
} from '../utils'


const tag = 'amnesia-flex-item'

const basis = [
    'auto',

    'px',

    '0', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6', '7', '8', 
    '9', '10', '11', '12', '14', '16', '20', '24', '28', '32', '36', '40', 
    '44', '48', '52', '56', '60', '64', '72', '80', '96',
    
    '1/2', 
    
    '1/3', '2/3', 
    
    '1/4', '2/4', '3/4', 
    
    '1/5', '2/5', '3/5', '4/5', 
    
    '1/6', '2/6', '3/6', '4/6', '5/6', 

    '1/12', '2/12', '3/12', '4/12', '5/12', '6/12', '7/12', '8/12', '9/12', 
    '10/12', '11/12',

    'full'
]

const flexs = [
    '1', 'auto', 'initial', 'none'
]

export const FlexItem = Node.create({
    name: 'flexItem',
    content: 'block*',
    group: 'block',
    inline: false,
    draggable: true,
    selectable: true,

    addOptions() {
        return {
            types: [],
            basis: basis,
            flexs: flexs,
            HTMLAttributes: {}
        }
    },

    addAttributes() {
        return {
            basis: {
                default: null,
                parseHTML: elem => {
                    const is_basis = new Set(
                        this.options.basis.map(
                            (x) => Array.from(generate_responsive_cls(`basis-${x}`))
                        ).flat()
                    )

                    const matches = []

                    for (const name of elem.classList) {
                        if (is_basis.has(name)) {
                            const result = name.split('-')
                            const [part1, part2] = result[0].split(':')
                            const breakpoint = part2 !== undefined ? part1 : null
                            const basis = result.slice(1).join('-')

                            matches.push({
                                basis: direction,
                                breakpoint: breakpoint
                            })
                        }
                    }

                    return matches.length ? matches : null

                },

                renderHTML: attrs => {
                    return render_basis_attrs(attrs)
                }
            },

            flex: {
                default: null,
                parseHTML: elem => {
                    const is_flex = new Set(
                        this.options.flexs.map(
                            (x) => Array.from(generate_responsive_cls(`flex-${x}`))
                        ).flat()
                    )

                    const matches = []

                    for (const name of elem.classList) {
                        if (is_flex.has(name)) {
                            const result = name.split('-')
                            const [part1, part2] = result[0].split(':')
                            const breakpoint = part2 !== undefined ? part1 : null
                            const flex = result.slice(1).join('-')

                            matches.push({
                                flex: flex,
                                breakpoint: breakpoint
                            })
                        }
                    }

                    return matches.length ? matches : null
                },

                renderHTML: attrs => {
                    return render_flex_attrs(attrs)
                }
            },

        }
    },

    parseHTML() {
        return [
            {
                tag: 'section.flex > article',
            },
            {
                tag: 'section.flex > section',
            },
            {
                tag: 'section.flex > div',
            }
            /*
            {
                style: 'display',
                getAttrs: value => (value == 'flex' || value == 'inline-flex') && null
            }
            */
        ]

    },

    renderHTML({ node, HTMLAttributes }) {
        return ['article', mergeAttributes(HTMLAttributes), 0]
    },

    addCommands() {
        return {
            setFlexBasis: (basis, breakpoint = null) => (p) => {
                const type = 'flexItem'
                const oldAttrs = p.editor.getAttributes(type)['basis']
                const attr = Array.isArray(oldAttrs)
                    ? oldAttrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if (this.options.basis.indexOf(basis) !== -1) {
                    // New value
                    attr.push({
                        breakpoint: breakpoint,
                        basis: basis,
                    })
                }

                return p.commands.updateAttributes(
                    type, { basis: attr }
                )
            },

            setFlexGrowShrink: (flex, breakpoint = null) => (p) => {
                const type = 'flexItem'
                const oldAttrs = p.editor.getAttributes(type)['flex']
                const attr = Array.isArray(oldAttrs)
                    ? oldAttrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if (this.options.flexs.indexOf(flex) !== -1) {
                    // New value
                    attr.push({
                        breakpoint: breakpoint,
                        flex: flex,
                    })
                }

                return p.commands.updateAttributes(
                    type, { flex: attr }
                )
            },

        }
    },

})
