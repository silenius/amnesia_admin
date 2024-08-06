import { 
    Extension,
    getAttributes
} from '@tiptap/core'

import {
    render_clear_attrs 
} from './utils'

import {
    generate_responsive_cls
} from '../utils'

const clears = ['right', 'left', 'both', 'none']

export const Clear = Extension.create({
    name: 'clear',

    addOptions() {
        return {
            types: [],
            clears: clears,
            default_clear: null,
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    clear: {
                        default: null,
                        
                        parseHTML: elem => {
                            const is_clear = new Set(
                                this.options.clears.map(
                                    (x) => Array.from(generate_responsive_cls(`clear-${x}`))
                                ).flat()
                            )

                            const matches = []

                            for (const name of elem.classList) {
                                if (is_clear.has(name)) {
                                    const clear = name.split('-').pop()
                                    const [part1, part2] = name.split(':')
                                    const breakpoint = part2 !== undefined ? part1 : null

                                    matches.push({
                                        clear: clear,
                                        breakpoint: breakpoint
                                    })
                                }
                            }

                            return matches.length ? matches : null

                        },
                        
                        renderHTML: attrs => {
                            return render_clear_attrs(attrs)
                        },
                    },
                },
            },
        ]
    },

    addCommands() {
        return {
            setClear: (clear, breakpoint = null) => (p) => {
                console.debug('===>>> setClear, clear: ', clear, ', bp: ', breakpoint)
                const type = this.options.types.find((e) => p.editor.isActive(e))
                const oldAttrs = p.editor.getAttributes(type)['clear']
                console.debug('===>>> setClear, oldAttrs: ', oldAttrs)

                const mark = Array.isArray(oldAttrs)
                    ? oldAttrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if (clear !== 'undefined') {
                    // New value
                    mark.push({
                        breakpoint: breakpoint,
                        clear: clear
                    })
                }

                // New value
                console.debug('===>>> setClear, mark: ', mark)

                if (type != 'textClass') {
                    return p.commands.updateAttributes(
                        type, { clear: mark }
                    )
                } else {
                    return p.chain().setMark(
                        'textClass', { clear: mark }
                    ).run()
                }
            },
        }
    },
})
