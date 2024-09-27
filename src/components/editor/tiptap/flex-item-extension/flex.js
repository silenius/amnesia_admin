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

    'basis-full'
]

const flexs = [
    'flex-1', 'flex-auto', 'flex-initial', 'flex-none'
]

export const FlexItem = Node.create({
    name: 'flexItem',
    content: 'block*',
    group: 'block',
    inline: false,
    draggable: true,
    selectable: true,

    addOptions() {
        return {
            types: [],
            basis: basis,
            flexs: flexs,
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
            /*
            {
                style: 'display',
                getAttrs: value => (value == 'flex' || value == 'inline-flex') && null
            }
            */
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
            setFlexBasis: (basis, breakpoint = null) => (p) => {
                const type = 'flexItem'
                const oldAttrs = p.editor.getAttributes(type)['basis']
                const attr = Array.isArray(oldAttrs)
                    ? oldAttrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if (this.options.basis.indexOf(basis) !== -1) {
                    // New value
                    attr.push({
                        breakpoint: breakpoint,
                        tw: basis,
                    })
                }

                return p.commands.updateAttributes(
                    type, { basis: attr }
                )
            },

            setFlexGrowShrink: (flex, breakpoint = null) => (p) => {
                const type = 'flexItem'
                const oldAttrs = p.editor.getAttributes(type)['flex']
                const attr = Array.isArray(oldAttrs)
                    ? oldAttrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if (this.options.flexs.indexOf(flex) !== -1) {
                    // New value
                    attr.push({
                        breakpoint: breakpoint,
                        tw: flex,
                    })
                }

                return p.commands.updateAttributes(
                    type, { flex: attr }
                )
            },

        }
    },

})
