import {
    mergeAttributes,
    Node
} from '@tiptap/core'

import { VueNodeViewRenderer } from '@tiptap/vue-3';

import Flex from './Flex.vue';

export default Node.create({
    name: 'flex-container',
    //content: 'flex-item*',
    group: 'block',
    draggable: true,
    selectable: true,
    addOptions() {
        return {
            flexDirection: {
                'row': 'flex-row', 
                'row-reverse': 'flex-row-reverse',
                'column': 'flex-col',
                'column-reverse': 'flex-col-reverse'
            },
            justifyContent: {
                'normal': 'justify-normal', 
                'flex-start': 'justify-start', 
                'flex-end': 'justify-end', 
                'center': 'justify-center', 
                'space-between': 'justify-between', 
                'space-around': 'justify-around', 
                'space-evenly': 'justify-evenly', 
                'stretch': 'justify-stretch',
            },
            wrap: ['wrap', 'wrap-reverse', 'nowrap'],
            alignItems: ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
            alignContent: ['normal', 'center', 'flex-start', 'flex-end', 'space-between', 'space-around', 'space-evenly', 'baseline', 'stretch'],
            gap: null,
            row_gap: null,
            column_gap: null,
            HTMLAttributes: {}
        }
    },

    addAttributes() {
        return {
            flexDirection: {
                default: null,
                rendered: false,
                parseHTML: elem => {
                    if (elem.style.flexDirection) {
                        return elem.style.flexDirection
                    } else {
                        for (const e of Object.entries(this.options.flexDirection)) {
                            if (elem.classList.contains(e[1])) {
                                return e[0]
                            }
                        }
                    }
                },
                renderHTML: attrs => {
                    if (attrs.flexDirection) {
                        return {
                            class: this.options.flexDirection[attrs.flexDirection]
                        }
                    }
                }
            },
            justifyContent: {
                default: null,
                rendered: false,
                parseHTML: elem => {
                    if (elem.style.justifyContent) {
                        return elem.style.justifyContent
                    } else {
                        for (const e of Object.entries(this.options.justifyContent)) {
                            if (elem.classList.contains(e[1])) {
                                return e[0]
                            }
                        }
                    }
                },
                renderHTML: attrs => {
                    if (attrs.justifyContent) {
                        return {
                            class: this.options.justifyContent[attrs.justifyContent]
                        }
                    }
                }
            },

        }
    },

    parseHTML() {
        console.debug('===>>> Flex parseHTML')
        return [
            {
                tag: 'flex-container'
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        console.debug('===>>> Flex renderHTML: ', HTMLAttributes)
        return [
            'flex-container', 
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
            0
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
