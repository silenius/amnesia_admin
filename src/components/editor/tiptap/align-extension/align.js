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

const aligns = ['left', 'center', 'right', 'justify']

const is_text = new Set(
    aligns.map((x) => Array.from(generate_responsive_cls(`text-${x}`))).flat()
)

export const Align = Extension.create({
    name: 'align',

    addOptions() {
        return {
            types: [],
            directions: aligns,
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
                const type = this.options.types.find((e) => p.editor.isActive(e))

                if (!type) {
                    return false
                }

                const oldAttrs = p.editor.getAttributes(type)['align']
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
