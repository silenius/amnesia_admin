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

const floats = ['float-right', 'float-left', 'float-none']

const is_float = new Set(
    floats.map((x) => Array.from(generate_responsive_cls(x))).flat()
)

export const Float = Extension.create({
    name: 'float',

    addOptions() {
        return {
            types: [],
            floats: ['none', 'left', 'right'],
            default_float: null,
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
                                    const float = name.split('-').pop()
                                    const [part1, part2] = name.split(':')
                                    const breakpoint = part2 !== undefined ? part1 : null

                                    matches.push({
                                        float: float,
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
            setFloat: (float, breakpoint = null) => (p) => {
                console.debug('===>>> setFloat, float: ', float, ', bp: ', breakpoint)
                const type = this.options.types.find((e) => p.editor.isActive(e))
                const oldAttrs = p.editor.getAttributes(type)['float']
                console.debug('===>>> setFloat, oldAttrs: ', oldAttrs)

                const mark = Array.isArray(oldAttrs)
                    ? oldAttrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if (float !== 'undefined') {
                    // New value
                    mark.push({
                        breakpoint: breakpoint,
                        float: float
                    })
                }

                // New value
                console.debug('===>>> setFloat, mark: ', mark)

                if (type != 'textClass') {
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
