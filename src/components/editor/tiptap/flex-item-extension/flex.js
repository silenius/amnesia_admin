import {
    mergeAttributes,
    Node
} from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3';

import {
    extract_tw_attrs,
    render_tw_attrs
} from '../utils'

import FlexItemNodeView from './FlexItemNodeView.vue'

const tag = 'amnesia-flex-item'

const basis = [
    'basis-auto',

    'basis-px',

    'basis-0', 'basis-0.5', 'basis-1', 'basis-1.5', 'basis-2', 'basis-2.5', 
    'basis-3', 'basis-3.5', 'basis-4', 'basis-5', 'basis-6', 'basis-7', 
    'basis-8', 'basis-9', 'basis-10', 'basis-11', 'basis-12', 'basis-14', 
    'basis-16', 'basis-20', 'basis-24', 'basis-28', 'basis-32', 'basis-36', 
    'basis-40', 'basis-44', 'basis-48', 'basis-52', 'basis-56', 'basis-60', 
    'basis-64', 'basis-72', 'basis-80', 'basis-96',

    'basis-1/2', 

    'basis-1/3', 'basis-2/3', 

    'basis-1/4', 'basis-2/4', 'basis-3/4', 

    'basis-1/5', 'basis-2/5', 'basis-3/5', 'basis-4/5', 

    'basis-1/6', 'basis-2/6', 'basis-3/6', 'basis-4/6', 'basis-5/6', 

    'basis-1/12', 'basis-2/12', 'basis-3/12', 'basis-4/12', 'basis-5/12', 
    'basis-6/12', 'basis-7/12', 'basis-8/12', 'basis-9/12', 'basis-10/12', 
    'basis-11/12',

    'basis-full',

    // Using the container scale
    // Use utilities like basis-xs and basis-sm to set the initial size of flex items based on the container scale:

    'basis-3xs', 'basis-2xs', 'basis-xs', 'basis-sm', 'basis-md', 'basis-lg', 
    'basis-xl', 'basis-2xl', 'basis-3xl', 'basis-4xl', 'basis-5xl', 
    'basis-6xl', 'basis-7xl', 
]

const flexs = [
    'flex-1', 'flex-auto', 'flex-initial', 'flex-none'
]

const grows = [
    'grow', 'grow-0'
]

const shrinks = [
    'shrink', 'shrink-0'
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

export const FlexItem = Node.create({
    name: 'flexItem',
    content: 'block*',
    group: 'block',
    inline: false,
    draggable: false,
    selectable: true,
    atom: true,

    addOptions() {
        return {
            types: [],
            basis: basis,
            flexs: flexs,
            grows: grows,
            shrinks: shrinks,
            HTMLAttributes: {}
        }
    },

    addAttributes() {
        return {
            basis: {
                default: null,
                parseHTML: elem => extract_tw_attrs(elem, this.options.basis),
                renderHTML: attrs => render_tw_attrs(attrs, 'basis')
            },

            flex: {
                default: null,
                parseHTML: elem => extract_tw_attrs(elem, this.options.flexs),
                renderHTML: attrs => render_tw_attrs(attrs, 'flex')
            },

            grow: {
                default: null,
                parseHTML: elem => extract_tw_attrs(elem, this.options.grows),
                renderHTML: attrs => render_tw_attrs(attrs, 'grow')
            },

            shrink: {
                default: null,
                parseHTML: elem => extract_tw_attrs(elem, this.options.shrinks),
                renderHTML: attrs => render_tw_attrs(attrs, 'shrink')
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'section.flex > article',
            },
            {
                tag: 'section.flex > section',
            },
            {
                tag: 'section.flex > div',
            }
        ]

    },

    renderHTML({ node, HTMLAttributes }) {
        return ['article', mergeAttributes(HTMLAttributes), 0]
    },

    /*
    addNodeView() {
        return VueNodeViewRenderer(FlexItemNodeView);
    },
    */

    addCommands() {
        return {
            setFlexBasis: ({basis, selected, breakpoint = null}) => (p) => {
                return _flex({
                    attr_name: 'basis',
                    attr_value: basis,
                    attr_values: this.options.basis,
                    breakpoint: breakpoint,
                    selected: selected,
                    p: p
                })
            },

            setFlexGrowShrink: ({flex, selected, breakpoint = null}) => (p) => {
                return _flex({
                    attr_name: 'flex',
                    attr_value: flex,
                    attr_values: this.options.flexs,
                    breakpoint: breakpoint,
                    selected: selected,
                    p: p
                })
            },

            setFlexGrow: ({grow, selected, breakpoint = null}) => (p) => {
                return _flex({
                    attr_name: 'grow',
                    attr_value: grow,
                    attr_values: this.options.grows,
                    breakpoint: breakpoint,
                    selected: selected,
                    p: p
                })
            },

            setFlexShrink: ({shrink, selected, breakpoint = null}) => (p) => {
                return _flex({
                    attr_name: 'shrink',
                    attr_value: shrink,
                    attr_values: this.options.shrinks,
                    breakpoint: breakpoint,
                    selected: selected,
                    p: p
                })
            },

        }
    },

    addKeyboardShortcuts() {
        return {
            Enter: ({ editor }) => {
                const selection = editor.state.selection

                if (editor.isActive('flexItem')) {
                    switch (selection.toJSON().type) {
                        case 'node':
                            editor.chain().insertContentAt(selection.from, '<p></p>').run()
                            return true
                            break;

                        case 'text':
                            // TODO use a filterTransaction, check is the
                            // flexItem node has childCount == 0 and if this is
                            // the case abort transaction ...?
                            const cursor = selection.$cursor

                            return ! (cursor 
                                && editor.isActive('flexItem') 
                                && (cursor.parentOffset > 0 
                                    || (cursor.parentOffset == 0 
                                        && (cursor.node(-1).type.name != 'flexItem'
                                            || (cursor.node(-1).type.name == 'flexItem' 
                                                && cursor.nodeAfter)
                                        )
                                    )
                                )
                            )

                            break;
                    }
                }
            }
        }
    }
})
