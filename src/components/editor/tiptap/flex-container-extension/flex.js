import {
    mergeAttributes,
    Node
} from '@tiptap/core'

import { storeToRefs } from 'pinia'

import { Plugin, PluginKey } from '@tiptap/pm/state'

import {
    extract_tw_attrs,
    render_tw_attrs
} from '../utils'

import { useEditorEventStore } from '../../../../stores/editor'

import { VueNodeViewRenderer } from '@tiptap/vue-3';
import { toValue } from 'vue'

import Flex from './Flex.vue'

const { lineage } = storeToRefs(useEditorEventStore())

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

const _flex = ({ attr_name, attr_value, attr_values, selected, p, breakpoint }) => {
    let attrs = selected.node.attrs[attr_name]
    let attr = Array.isArray(attrs)
        ? attrs.filter((x) => x.breakpoint != breakpoint)
        : []

    if (attr_values.indexOf(attr_value) !== -1) {
        attr.push({
            breakpoint: breakpoint,
            tw: attr_value
        })
    }

    attr = Object.fromEntries([[`${attr_name}`, attr]])

    return p.commands._updateNodeAttributes(
        selected.pos, selected.node, attr
    )
}

export const FlexContainer = Node.create({
    name: 'flexContainer',
    content: 'flexItem*',
    group: 'block',
    inline: false,
    draggable: false,
    selectable: true,
    atom: true,

    addOptions() {
        return {
            types: [],
            str: 'Container',
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
        return ['section', mergeAttributes(HTMLAttributes, { class: 'flex', 'data-node': 'flexContainer' }), 0]
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

            setFlexDirection: ({direction, selected, breakpoint = null}) => (p) => {
                return _flex({
                    attr_name: 'direction',
                    attr_value: direction,
                    attr_values: this.options.directions,
                    breakpoint: breakpoint,
                    selected: selected,
                    p: p
                })
            },

            setFlexWrap: ({wrap, selected, breakpoint = null}) => (p) => {
                return _flex({
                    attr_name: 'wrap',
                    attr_value: wrap,
                    attr_values: this.options.wraps,
                    breakpoint: breakpoint,
                    selected: selected,
                    p: p
                })
            },

            setFlexJustifyContent: ({justify, selected, breakpoint = null}) => (p) => {
                return _flex({
                    attr_name: 'justify_content',
                    attr_value: justify,
                    attr_values: this.options.justify_contents,
                    breakpoint: breakpoint,
                    selected: selected,
                    p: p
                })
            },

            setFlexAlignItems: ({align, selected, breakpoint = null}) => (p) => {
                return _flex({
                    attr_name: 'align_items',
                    attr_value: align,
                    attr_values: this.options.align_items,
                    breakpoint: breakpoint,
                    selected: selected,
                    p: p
                })
            },

            setFlexAlignContent: ({align, selected, breakpoint = null}) => (p) => {
                return _flex({
                    attr_name: 'align_content',
                    attr_value: align,
                    attr_values: this.options.align_contents,
                    breakpoint: breakpoint,
                    selected: selected,
                    p: p
                })
            },
        }
    },

    addProseMirrorPlugins() {
        return [
            new Plugin({
                filterTransaction(transaction, state) {
                    if (transaction.getMeta('force')) {
                        return true
                    }

                    let return_value = true
                    let replace_with_content = false

                    transaction.steps.forEach((step, index) => {
                        if (step.jsonID == 'replace') {
                            if (step.slice.size > 0) {
                                replace_with_content = true
                            }
                        }
                    })

                    if (replace_with_content) {
                        return true
                    }

                    // Loop on insertions and deletions (StepMap)
                    transaction.mapping.maps.forEach((map) => {

                        // Loop on changed ranges included in the map
                        map.forEach((oldStart, oldEnd, newStart, newEnd) => {
                            /*
                            console.log('OLD START : ', oldStart)
                            console.log('OLD END : ', oldEnd)
                            console.log('NEW START : ', newStart)
                            console.log('NEW END : ', newEnd)
                            */

                            if (oldStart == newStart && oldEnd > newEnd) {
                                state.doc.nodesBetween(newEnd, oldEnd, (node, pos, parent) => {
                                    // If the node is a flex item and that we
                                    // are explicitely deleting *that* node
                                    // (newEnd == pos) then abort the transaction.
                                    // This is to prevent deletion of a
                                    // flexItem if we're in a flexContainer
                                    // (to prevent UI glitches).
                                    if (
                                        (
                                            node.type.name == 'flexItem' 
                                            && pos >= newEnd 
                                            && pos <= oldEnd
                                        ) 
                                        || (
                                            /* Prevent deletion if the node:
                                             * - is first child of his parent
                                             * - his parent is a flexItem
                                             * - his parent has only one child
                                             * - doesn't have any content 
                                             *   (empty paragraph, ...)
                                             */
                                            parent.type.name == 'flexItem' 
                                            && node.eq(parent.firstChild) 
                                            && parent.childCount == 1 
                                            && node.content.size < 1
                                        )
                                    ) {
                                        console.log('===>>> TRANSACTION ABORTED <<<===')
                                        console.log('===>>> NODE: ', node)
                                        console.log('===>>> POS: ', pos)
                                        console.log('===>>> PARENT: ', parent)
                                        return_value = false
                                    }
                                })
                            }
                        })
                    })

                    return return_value
                }
            })
        ];
    },

    // Return true = disable command
    addKeyboardShortcuts() {
        return {
            Backspace: ({ editor }) => {
                console.log('===>>> BACKSPACE', editor)
                return false
                /*
                if (editor.isActive('flexContainer')) {
                    const selection = editor.state.selection
                    console.log(selection.$anchor.pos)
                    const n = editor.state.doc.nodeAt(selection.$anchor.pos-1)
                    console.log(n)
                    return n?.type.name == 'flexItem' || false
                }
                */
            },
            Delete: ({ editor }) => {
                console.log('===>>> DELETE')
                return false
                /*
                if (editor.isActive('flexContainer')) {
                    return true
                }
                */
            },
        }
    }
    /*

    addNodeView() {
        return VueNodeViewRenderer(Flex);
    }
    */

})
