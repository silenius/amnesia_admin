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
            HTMLAttributes: {},
        }
    },

    inline() {
        return this.options.inline
    },

    group() {
        return this.options.inline ? 'inline' : 'block'
    },

    draggable: true,
    marks: '',

    addAttributes() {
        return {
            src: {
                default: null,
                parseHTML: elem => {
                    console.debug('===>>> Image src parseHTML: ', elem)
                    const oid = elem.getAttribute('data-objectid')
                    return oid ? backend_url(oid) : elem.getAttribute('src')
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
