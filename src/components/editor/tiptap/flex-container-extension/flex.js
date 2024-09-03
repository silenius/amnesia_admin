import {
    mergeAttributes,
    Node
} from '@tiptap/core'

import {
    render_direction_attrs,
    render_wrap_attrs,
    render_justify_attrs,
    render_align_items_attrs,
    render_align_content_attrs,
} from './utils'

import {
    generate_responsive_cls
} from '../utils'

import { VueNodeViewRenderer } from '@tiptap/vue-3';

import Flex from './Flex.vue'

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

const align_items = [
    'start', 'end', 'center', 'baseline', 'stretch'
]

const align_contents = [
    'normal', 'start', 'end', 'center', 'between', 
    'around', 'evenly', 'baseline', 'stretch'
]

export const FlexContainer = Node.create({
    name: 'flexContainer',
    content: 'article*',
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
            align_items: align_items,
            align_contents: align_contents,
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

                renderHTML: attrs => {
                    return render_direction_attrs(attrs)
                }
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

                renderHTML: attrs => {
                    return render_wrap_attrs(attrs)
                }
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

                renderHTML: attrs => {
                    return render_justify_attrs(attrs)
                }
            },

            align_items: {
                default: null,
                parseHTML: elem => {
                    const is_align = new Set(
                        this.options.align_items.map(
                            (x) => Array.from(generate_responsive_cls(`items-${x}`))
                        ).flat()
                    )

                    const matches = []

                    for (const name of elem.classList) {
                        if (is_align.has(name)) {
                            const result = name.split('-')
                            const [part1, part2] = result[0].split(':')
                            const breakpoint = part2 !== undefined ? part1 : null
                            const align = result.slice(1).join('-')

                            matches.push({
                                align_items: align,
                                breakpoint: breakpoint
                            })
                        }
                    }

                    return matches.length ? matches : null
                },

                renderHTML: attrs => {
                    return render_align_items_attrs(attrs)
                }
            },

            align_content: {
                default: null,
                parseHTML: elem => {
                    const is_align = new Set(
                        this.options.align_contents.map(
                            (x) => Array.from(generate_responsive_cls(`content-${x}`))
                        ).flat()
                    )

                    const matches = []

                    for (const name of elem.classList) {
                        if (is_align.has(name)) {
                            const result = name.split('-')
                            const [part1, part2] = result[0].split(':')
                            const breakpoint = part2 !== undefined ? part1 : null
                            const align = result.slice(1).join('-')

                            matches.push({
                                align_content: align,
                                breakpoint: breakpoint
                            })
                        }
                    }

                    return matches.length ? matches : null
                },

                renderHTML: attrs => {
                    return render_align_content_attrs(attrs)
                }
            },



        }
    },

    parseHTML() {
        return [
            {
                tag: 'section',
                getAttrs: element => element.classList.contains('flex') && null
            },
            /*
            {
                style: 'display',
                getAttrs: value => (value == 'flex' || value == 'inline-flex') && null
            }
            */
        ]

    },

    renderHTML({ node, HTMLAttributes }) {
        return ['section', mergeAttributes(HTMLAttributes, { class: 'flex' }), 0]
    },

    addCommands() {
        return {
            setFlexDirection: (direction, breakpoint = null) => (p) => {
                const type = 'flexContainer'
                const oldAttrs = p.editor.getAttributes(type)['direction']
                const attr = Array.isArray(oldAttrs)
                    ? oldAttrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if (this.options.directions.indexOf(direction) !== -1) {
                    // New value
                    attr.push({
                        breakpoint: breakpoint,
                        direction: direction,
                    })
                }

                return p.commands.updateAttributes(
                    type, { direction: attr }
                )
            },

            setFlexWrap: (wrap, breakpoint = null) => (p) => {
                const type = 'flexContainer'
                const oldAttrs = p.editor.getAttributes(type)['wrap']
                const attr = Array.isArray(oldAttrs)
                    ? oldAttrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if (this.options.wraps.indexOf(wrap) !== -1) {
                    // New value
                    attr.push({
                        breakpoint: breakpoint,
                        wrap: wrap,
                    })
                }

                return p.commands.updateAttributes(
                    type, { wrap: attr }
                )
            },

            setFlexJustifyContent: (justify, breakpoint = null) => (p) => {
                const type = 'flexContainer'
                const oldAttrs = p.editor.getAttributes(type)['justify_content']
                const attr = Array.isArray(oldAttrs)
                    ? oldAttrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if (this.options.justify_contents.indexOf(justify) !== -1) {
                    // New value
                    attr.push({
                        breakpoint: breakpoint,
                        justify_content: justify,
                    })
                }

                return p.commands.updateAttributes(
                    type, { justify_content: attr }
                )
            },

            setFlexAlignItems: (align, breakpoint = null) => (p) => {
                const type = 'flexContainer'
                const oldAttrs = p.editor.getAttributes(type)['align_items']
                const attr = Array.isArray(oldAttrs)
                    ? oldAttrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if (this.options.align_items.indexOf(align) !== -1) {
                    // New value
                    attr.push({
                        breakpoint: breakpoint,
                        align_items: align,
                    })
                }

                return p.commands.updateAttributes(
                    type, { align_items: attr }
                )
            },

            setFlexAlignContent: (align, breakpoint = null) => (p) => {
                const type = 'flexContainer'
                const oldAttrs = p.editor.getAttributes(type)['align_content']
                const attr = Array.isArray(oldAttrs)
                    ? oldAttrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if (this.options.align_contents.indexOf(align) !== -1) {
                    // New value
                    attr.push({
                        breakpoint: breakpoint,
                        align_content: align,
                    })
                }

                return p.commands.updateAttributes(
                    type, { align_content: attr }
                )
            },


        }
    },

    addKeyboardShortcuts() {
        return {
            Enter: ({ editor }) => {
                if (editor.isActive('flexContainer') && editor.isActive('article')) {
                    console.log(editor.state.selection)
                    editor.commands.createParagraphNear()
                    /*

                    let foo

                    do {
                        console.log('===> NODE: ', editor.state.selection)
                        if (!editor.commands.selectParentNode()) break
                    } while (true)

                    const { from, to } = editor.state.selection
                    console.log('FROM : ', from)
                    console.log('TO : ', to)
                    editor.commands.createParagraphNear()
                    */
                    /*

                    editor.commands.insertContentAt(
                        from,
                        '<p>FROM</p>'
                    )

                    editor.commands.insertContentAt(
                        to+1,
                        '<p>TO</p>'
                    )
                    */


                    /*

                    console.log('EDITOR : ', editor)
                    const foo2 = editor.$pos(editor.state.selection.from).closest('flexContainer').to
                    editor.commands.insertContentAt(foo2, '<p>TEST</p>', {
                        updateSelection: true
                    })
                    */
                }
            },
        };
    },
    /*

    addNodeView() {
        return VueNodeViewRenderer(Flex);
    }
    */

})
