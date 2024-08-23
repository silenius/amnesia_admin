import {
    mergeAttributes,
    Node
} from '@tiptap/core'

import {
    generate_responsive_cls
} from '../utils'

import { VueNodeViewRenderer } from '@tiptap/vue-3';

import Flex from './Flex.vue';

const tag = 'amnesia-flex-container'

const directions = [
    'row', 'row-reverse', 'col', 'col-reverse'
]

const wraps = [
    'nowrap', 'wrap', 'wrap-reverse'
]

const justify_contents = [
    'normal', 'start', 'end', 'center', 'between', 
    'around', 'evenly', 'stretch'
]

export const FlexContainer = Node.create({
    name: 'flexContainer',
    content: 'block*',
    group: 'block',
    inline: false,
    draggable: true,
    selectable: true,

    addOptions() {
        return {
            types: [],
            directions: directions,
            wraps: wraps,
            justify_contents: justify_contents,
            HTMLAttributes: {}
        }
    },

    addAttributes() {
        return {
            direction: {
                default: null,
                parseHTML: elem => {
                    const is_direction = new Set(
                        this.options.directions.map(
                            (x) => Array.from(generate_responsive_cls(`flex-${x}`))
                        ).flat()
                    )

                    const matches = []

                    for (const name of elem.classList) {
                        if (is_direction.has(name)) {
                            const result = name.split('-')
                            const [part1, part2] = result[0].split(':')
                            const breakpoint = part2 !== undefined ? part1 : null
                            const direction = result.slice(1).join('-')

                            matches.push({
                                direction: direction,
                                breakpoint: breakpoint
                            })
                        }
                    }

                    return matches.length ? matches : null

                },
            },

            wrap: {
                default: null,
                parseHTML: elem => {
                    const is_wrap = new Set(
                        this.options.wraps.map(
                            (x) => Array.from(generate_responsive_cls(`flex-${x}`))
                        ).flat()
                    )

                    const matches = []

                    for (const name of elem.classList) {
                        if (is_wrap.has(name)) {
                            const result = name.split('-')
                            const [part1, part2] = result[0].split(':')
                            const breakpoint = part2 !== undefined ? part1 : null
                            const wrap = result.slice(1).join('-')

                            matches.push({
                                wrap: wrap,
                                breakpoint: breakpoint
                            })
                        }
                    }

                    return matches.length ? matches : null

                },
            },

            justify_content: {
                default: null,
                parseHTML: elem => {
                    const is_justify = new Set(
                        this.options.justify_contents.map(
                            (x) => Array.from(generate_responsive_cls(`justify-${x}`))
                        ).flat()
                    )

                    const matches = []

                    for (const name of elem.classList) {
                        if (is_justify.has(name)) {
                            const result = name.split('-')
                            const [part1, part2] = result[0].split(':')
                            const breakpoint = part2 !== undefined ? part1 : null
                            const justify = result.slice(1).join('-')

                            matches.push({
                                justify_content: justify,
                                breakpoint: breakpoint
                            })
                        }
                    }

                    return matches.length ? matches : null
                },

            }
        }
    },

    parseHTML() {
        return [
            {
                tag: tag
            },
            {
                style: 'display',
                getAttrs: value => (value == 'flex' || value == 'inline-flex') && null
            }
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return [
            tag, 
            mergeAttributes(HTMLAttributes)
        ]
    },

    addCommands() {
        return {
            setFlex: options => ({ commands }) => {
                return commands.insertContent({
                    type: this.name,
                    attrs: options,
                })
            },
        }
    },

    addNodeView() {
        return VueNodeViewRenderer(Flex);
    }

})
