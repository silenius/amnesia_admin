import { 
    Extension,
    getAttributes
} from '@tiptap/core'

import {
    render_maxWidth_attrs 
} from './utils'

import {
    generate_responsive_cls
} from '../utils'

const maxWidths = [
    'none', 

    'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl',

    'full', 'min', 'max', 'fit', 'prose',

    'screen-sm', 'screen-md', 'screen-lg', 'screen-xl', 'screen-2xl',

    '0', 'px', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6', '7',
    '8', '9', '10', '11', '12', '14', '16', '20', '24', '28', '32', '36', 
    '40', '44', '48', '52', '56', '60', '64', '72', '80', '96', 

]

export const MaxWidth = Extension.create({
    name: 'maxWidth',

    addOptions() {
        return {
            maxWidths: maxWidths,
            types: [],
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    maxWidth: {
                        default: null,

                        parseHTML: elem => {
                            const is_maxWidth = new Set(
                                this.options.maxWidths.map(
                                    (x) => Array.from(generate_responsive_cls(`max-w-${x}`))
                                ).flat()
                            )

                            const matches = []

                            for (const name of elem.classList) {
                                if (is_maxWidth.has(name)) {
                                    const [part1, part2] = name.split(':')
                                    const breakpoint = part2 !== undefined ? part1 : null
                                    let maxWidth = breakpoint === null ? part1 : part2
                                    maxWidth = maxWidth.replace(/^max-w-/, '')

                                    matches.push({
                                        maxWidth: maxWidth,
                                        breakpoint: breakpoint
                                    })
                                }
                            }

                            return matches.length ? matches : null

                        },

                        renderHTML: attrs => {
                            return render_maxWidth_attrs(attrs)
                        },
                    },
                },
            },
        ]
    },

    addCommands() {
        return {
            setMaxWidth: (maxWidth, breakpoint = null) => (p) => {
                const type = this.options.types.find((e) => p.editor.isActive(e))
                const oldAttrs = p.editor.getAttributes(type)['maxWidth']
                const mark = Array.isArray(oldAttrs)
                    ? oldAttrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if (this.options.maxWidths.indexOf(width) !== -1) {
                    // New value
                    mark.push({
                        breakpoint: breakpoint,
                        maxWidth: maxWidth
                    })

                    return p.commands.updateAttributes(
                        type, { maxWidth: mark }
                    )
                } else {
                    return p.commands.resetAttributes(
                        type, this.name
                    )
                }
 
            },
        }
    },
})
