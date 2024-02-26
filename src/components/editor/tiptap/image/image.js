import {
    mergeAttributes,
    Node,
    nodeInputRule,
} from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3';
import { backend_url } from '@/composables/fetch.js';
import Image from './Image.vue';

export const inputRegex = /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/

export default Node.create({
    name: 'image',

    addOptions() {
        return {
            inline: false,
            allowBase64: false,
            selectable: true,
            HTMLAttributes: {},
        }
    },

    inline() {
        return this.options.inline
    },

    group() {
        return this.options.inline ? 'inline' : 'block'
    },

    selectable() {
        return this.options.selectable
    },

    draggable: true,

    marks: '',

    addAttributes() {
        return {
            src: {
                default: null,
                parseHTML: elem => {
                    console.debug('===>>> Image src parseHTML: ', elem)
                    if (elem.hasAttribute('data-objectid')) {
                        return backend_url(elem.getAttribute('data-objectid'))
                    } else if (elem.hasAttribute('src')) {
                        return elem.getAttribute('src')
                    } else {
                        return null
                    }
                },
            },
            'data-objectid': {
                default: null,
            },
            alt: {
                default: null,
            },
            title: {
                default: null,
            },
            width: {
                default: null,
            },
            height: {
                default: null
            }
        }
    },

    parseHTML() {
        console.debug('===>>> Image parseHTML')
        return [
            {
                tag: this.options.allowBase64
                    ? 'img[src]'
                    : 'img[src]:not([src^="data:"])',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        console.debug('===>>> Image renderHTML: ', HTMLAttributes)
        return ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
    },

    addCommands() {
        return {
            setImage: options => ({ commands }) => {
                return commands.insertContent({
                    type: this.name,
                    attrs: options,
                })
            },
        }
    },

    addInputRules() {
        return [
            nodeInputRule({
                find: inputRegex,
                type: this.type,
                getAttributes: match => {
                    const [,, alt, src, title] = match

                    return { src, alt, title }
                },
            }),
        ]
    },

    addNodeView() {
        return VueNodeViewRenderer(Image);
    }
})
