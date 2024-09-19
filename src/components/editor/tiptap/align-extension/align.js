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
            setAlign: (direction, breakpoint=null, type=undefined) => (p) => {
                if (!type) {
                    type = this.options.types.find((e) => p.editor.isActive(e))
                }

                const oldAttrs = p.editor.getAttributes(type)['align']
                const attr = Array.isArray(oldAttrs)
                    ? oldAttrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if (this.options.directions.indexOf(direction) !== -1) {
                    attr.push({
                        breakpoint: breakpoint,
                        direction: direction
                    })
                }


                return p.commands.updateAttributes(
                    type, { align: attr }
                )
            },
        }
    },
})
