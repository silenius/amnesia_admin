import { 
    Extension,
    getAttributes
} from '@tiptap/core'

import {
    render_float_attrs 
} from './utils'

import {
    generate_responsive_cls
} from '../utils'

const is_float_right = generate_responsive_cls('float-right')
const is_float_left = generate_responsive_cls('float-left')
const is_float_none = generate_responsive_cls('float-none')
const is_float = new Set([...is_float_right, ...is_float_left, ...is_float_none])

export const Float = Extension.create({
    name: 'float',

    addOptions() {
        return {
            types: [],
            directions: ['none', 'left', 'right'],
            default_direction: null,
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    float: {
                        default: null,
                        
                        parseHTML: elem => {
                            const matches = []

                            for (const name of elem.classList) {
                                if (is_float.has(name)) {
                                    const direction = name.split('-').pop()
                                    const [part1, part2] = name.split(':')
                                    const breakpoint = part2 !== undefined ? part1 : null

                                    matches.push({
                                        direction: direction,
                                        breakpoint: breakpoint
                                    })
                                }
                            }

                            return matches.length ? matches : null

                        },
                        
                        renderHTML: attrs => {
                            return render_float_attrs(attrs)
                        },
                    },
                },
            },
        ]
    },

    addCommands() {
        return {
            setFloat: (direction, breakpoint = null) => (p) => {
                console.debug('===>>> setFloat, direction: ', direction, ', bp: ', breakpoint)
                const type = p.state.selection.node ? p.state.selection.node.type.name : 'textClass'

                const oldAttrs = getAttributes(p.state, type)['float']
                console.debug('===>>> setFloat, oldAttrs: ', oldAttrs)

                const mark = Array.isArray(oldAttrs)
                    ? oldAttrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if (direction !== 'undefined') {
                    // New value
                    mark.push({
                        breakpoint: breakpoint,
                        direction: direction
                    })
                }

                // New value
                console.debug('===>>> setFloat, mark: ', mark)

                if (p.state.selection.node) {
                    return p.commands.updateAttributes(
                        type, { float: mark }
                    )
                } else {
                    return p.chain().setMark(
                        'textClass', { float: mark }
                    ).run()
                }
            },
        }
    },
})
