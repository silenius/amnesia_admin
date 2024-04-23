import {
    mergeAttributes,
    Node,
    nodeInputRule,
} from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3';
import { backend_url } from '@/composables/fetch.js';
import Image from './Image.vue';

/* TODO: add support for <picture>:
 * <picture>
 *   <source srcset="http://dev.lan/bbpf/5887" media="(min-width: 768px)" />
 *   <source srcset="http://dev.lan/bbpf/5890" media="(min-width: 640px)" />
 *   <source srcset="http://dev.lan/bbpf/5889" />
 *   <img src="http://dev.lan/bbpf/5889"/>
 * </picture>
 */

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
            'data-responsive': {
                default: null,
                parseHTML: elem => {
                    if (elem.hasAttribute('data-responsive')) {
                        try {
                            return JSON.parse(elem.getAttribute('data-responsive'))
                        } catch (e) {
                            return null
                        }
                    }
                },
                renderHTML: attrs => {
                    if (attrs['data-responsive']) {
                        try {
                            return JSON.stringify(attrs['data-responsive'])
                        } catch {
                            return null
                        }
                    }
                }
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
        return [
            {
                tag: this.options.allowBase64
                    ? 'img[src]'
                    : 'img[src]:not([src^="data:"])',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
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
