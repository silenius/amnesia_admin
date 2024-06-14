import {
    mergeAttributes,
    Node
} from '@tiptap/core'

import { VueNodeViewRenderer } from '@tiptap/vue-3'

import Video from './Video.vue'

/*
 * Youtube: 560 x 314
 * Vimeo: 425 x 350
 * Dialymotion: 480 x 270
 *
 */

const patterns = [
    {
        regex: /youtu\.be\/([\w\-_\?&=.]+)/i,
        type: 'youtube',
        url: 'www.youtube.com/embed/$1',
    },
    {
        regex: /youtube\.com(.+)v=([^&]+)(&([a-z0-9&=\-_]+))?/i,
        type: 'youtube',
        url: 'www.youtube.com/embed/$2?$4',
    },
    {
        regex: /youtube.com\/embed\/([a-z0-9\?&=\-_]+)/i,
        type: 'youtube',
        url: 'www.youtube.com/embed/$1',
    },
    {
        regex: /vimeo\.com\/([0-9]+)\?h=(\w+)/,
        type: 'vimeo',
        url: 'player.vimeo.com/video/$1?h=$2&title=0&byline=0&portrait=0&color=8dc7dc',
    },
    {
        regex: /vimeo\.com\/(.*)\/([0-9]+)\?h=(\w+)/,
        type: 'vimeo',
        url: 'player.vimeo.com/video/$2?h=$3&title=0&amp;byline=0',
    },
    {
        regex: /vimeo\.com\/([0-9]+)/,
        type: 'vimeo',
        url: 'player.vimeo.com/video/$1?title=0&byline=0&portrait=0&color=8dc7dc',
    },
    {
        regex: /vimeo\.com\/(.*)\/([0-9]+)/,
        type: 'vimeo',
        url: 'player.vimeo.com/video/$2?title=0&amp;byline=0',
    },
    {
        regex: /dailymotion\.com\/video\/([^_]+)/,
        type: 'dailymotion',
        url: 'www.dailymotion.com/embed/video/$1',
    },
    {
        regex: /dai\.ly\/([^_]+)/,
        type: 'dailymotion',
        url: 'www.dailymotion.com/embed/video/$1',
    }
];


export default Node.create({
    name: 'video',
    inline: false,
    group: 'block',
    draggable: true,

    addOptions() {
        return {
            autoplay: false,
            selectable: true,
        }

    },

    selectable() {
        return this.options.selectable
    },

    addAttributes() {
        return {
            src: {
                default: null,
            },
            title: {
                default: null,
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'amnesia-video'
            }
        ]
    },

    renderHTML({node, HTMLAttributes}) {
        return [
            'amnesia-video', 
            mergeAttributes(HTMLAttributes)
        ]
    },

    addCommands() {
        return {
            setVideo: options => ({ commands }) => {
                const match = patterns.find((pattern) => pattern.regex.test(options.src))

                if (match !== undefined) {
                    const matches = match.regex.exec(options.src)
                    let url = `https://${match.url}`

                    for (const [i, value] of matches.entries()) {
                        url = url.replace(`$${i}`, () => matches[i] ? matches[i] : '')
                    }

                    return commands.insertContent({
                        type: this.name,
                        attrs: {
                            src: url,
                            width: 560,
                            height: 650
                        },
                    })

                }
            },
        }
    },

    addNodeView() {
        return VueNodeViewRenderer(Video);
    }

})
