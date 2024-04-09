import { 
    Extension,
    getAttributes
} from '@tiptap/core'

import {
    render_align_attrs 
} from './utils'

import {
    generate_responsive_cls
} from '../utils'

const is_text_left = generate_responsive_cls('text-left')
const is_text_center = generate_responsive_cls('text-center')
const is_text_right = generate_responsive_cls('text-right')
const is_text_justify = generate_responsive_cls('text-justify')
const is_text = new Set([...is_text_left, ...is_text_center, 
    ...is_text_right, ...is_text_justify])

export const Align = Extension.create({
    name: 'align',

    addOptions() {
        return {
            types: [],
            directions: ['none', 'left', 'center', 'right', 'justify'],
            default_direction: null,
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    align: {
                        default: null,

                        parseHTML: elem => {
                            const matches = []

                            for (const name of elem.classList) {
                                if (is_text.has(name)) {
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
                            return render_align_attrs(attrs)
                        },
                    },
                },
            },
        ]
    },

    addCommands() {
        return {
            setAlign: (direction, breakpoint = null) => (p) => {
                console.debug('===>>> setAlign, direction: ', direction, ', bp: ', breakpoint)
                const type = p.editor.isActive('image') ? 'image' : 'paragraph'

                const oldAttrs = getAttributes(p.state, type)['align']
                console.debug('===>>> setAlign, oldAttrs: ', oldAttrs)

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
                console.debug('===>>> setAlign, mark: ', mark)

                return p.commands.updateAttributes(
                    type, { align: mark }
                )
            },
        }
    },
})
