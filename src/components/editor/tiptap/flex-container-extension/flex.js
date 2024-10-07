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
    extract_tw_attrs,
    render_tw_attrs
} from '../utils'

import { VueNodeViewRenderer } from '@tiptap/vue-3';

import Flex from './Flex.vue'

const tag = 'amnesia-flex-container'

const directions = [
    'flex-row', 'flex-row-reverse', 'flex-col', 'flex-col-reverse'
]

const wraps = [
    'flex-nowrap', 'flex-wrap', 'flex-wrap-reverse'
]

const justify_contents = [
    'justify-normal', 'justify-start', 'justify-end', 'justify-center', 
    'justify-between', 'justify-around', 'justify-evenly', 'justify-stretch'
]

const align_items = [
    'items-start', 'items-end', 'items-center', 'items-baseline', 
    'items-stretch'
]

const align_contents = [
    'content-normal', 'content-start', 'content-end', 'content-center', 
    'content-between', 'content-around', 'content-evenly', 'content-baseline',
    'content-stretch'
]

export const FlexContainer = Node.create({
    name: 'flexContainer',
    content: 'flexItem*',
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
                parseHTML: elem => extract_tw_attrs(elem, this.options.directions),
                renderHTML: attrs => render_tw_attrs(attrs, 'direction')
            },

            wrap: {
                default: null,
                parseHTML: elem => extract_tw_attrs(elem, this.options.wraps),
                renderHTML: attrs => render_tw_attrs(attrs, 'wrap')
            },

            justify_content: {
                default: null,
                parseHTML: elem => extract_tw_attrs(elem, this.options.justify_contents),
                renderHTML: attrs => render_tw_attrs(attrs, 'justify_content')
            },

            align_items: {
                default: null,
                parseHTML: elem => extract_tw_attrs(elem, this.options.align_items),
                renderHTML: attrs => render_tw_attrs(attrs, 'align_items')
            },

            align_content: {
                default: null,
                parseHTML: elem => extract_tw_attrs(elem, this.options.align_contents),
                renderHTML: attrs => render_tw_attrs(attrs, 'align_content')
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
            /*
            setFlexContainer: (value, breakpoint=null, attr, attrs) => (p) => {
                const v = (p.editor.getAttributes(this.name)[attr] || []).filter(
                    (x) => x.breakpoint !== breakpoint
                )

                if (attrs.indexOf(value) !== -1) {
                    v.push(Object.fromEntries([['breakpoint', breakpoint], 
                                               [attr, value]]))
                }

                return p.commands.updateAttributes(
                    this.name, Oject.fromEntries([[attr, v]])
                )
            },
            */

            setFlexDirection: (direction, breakpoint = null) => (p) => {
                const oldAttrs = p.editor.getAttributes(this.name)['direction']
                const attr = Array.isArray(oldAttrs)
                    ? oldAttrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if (this.options.directions.indexOf(direction) !== -1) {
                    // New value
                    attr.push({
                        breakpoint: breakpoint,
                        tw: direction,
                    })
                }

                return p.commands.updateAttributesLast(
                    this.name, { direction: attr }
                )
            },

            setFlexWrap: (wrap, breakpoint = null) => (p) => {
                const oldAttrs = p.editor.getAttributes(this.name)['wrap']
                const attr = Array.isArray(oldAttrs)
                    ? oldAttrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if (this.options.wraps.indexOf(wrap) !== -1) {
                    // New value
                    attr.push({
                        breakpoint: breakpoint,
                        tw: wrap,
                    })
                }

                return p.commands.updateAttributesLast(
                    this.name, { wrap: attr }
                )
            },

            setFlexJustifyContent: (justify, breakpoint = null) => (p) => {
                const oldAttrs = p.editor.getAttributes(this.name)['justify_content']
                const attr = Array.isArray(oldAttrs)
                    ? oldAttrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if (this.options.justify_contents.indexOf(justify) !== -1) {
                    // New value
                    attr.push({
                        breakpoint: breakpoint,
                        tw: justify,
                    })
                }

                return p.commands.updateAttributesLast(
                    this.name, { justify_content: attr }
                )
            },

            setFlexAlignItems: (align, breakpoint = null) => (p) => {
                const oldAttrs = p.editor.getAttributes(this.name)['align_items']
                const attr = Array.isArray(oldAttrs)
                    ? oldAttrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if (this.options.align_items.indexOf(align) !== -1) {
                    // New value
                    attr.push({
                        breakpoint: breakpoint,
                        tw: align,
                    })
                }

                return p.commands.updateAttributesLast(
                    this.name, { align_items: attr }
                )
            },

            setFlexAlignContent: (align, breakpoint = null) => (p) => {
                const oldAttrs = p.editor.getAttributes(this.name)['align_content']
                const attr = Array.isArray(oldAttrs)
                    ? oldAttrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if (this.options.align_contents.indexOf(align) !== -1) {
                    // New value
                    attr.push({
                        breakpoint: breakpoint,
                        tw: align,
                    })
                }

                return p.commands.updateAttributesLast(
                    this.name, { align_content: attr }
                )
            },


        }
    },

    addKeyboardShortcuts() {
        return {
            Enter: ({ editor }) => {
                const selection = editor.state.selection
                console.log('EDI: ', editor)
                console.log('SEL: ', selection)

                console.log(editor.extensionManager.extensions.filter((x) => x.type == 'node' && editor.isActive(x.name)))

                if (editor.isActive('flexContainer')) {
                    if (selection.$cursor !== null && 
                        selection.$cursor.parentOffset == 0
                    ) {
                        // Get the parent <article>
                        const article = editor.$pos(selection.from).closest('article')
                        if (article.parent.lastChild.pos == article.pos) {
                            return true
                            //editor.commands.createParagraphNear()
                        } else {
                            return true
                        }
                    } else {
                        editor.commands.createParagraphNear()
                    }

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
