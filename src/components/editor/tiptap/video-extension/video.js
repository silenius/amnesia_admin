import {
    mergeAttributes,
    Node
} from '@tiptap/core'

import { VueNodeViewRenderer } from '@tiptap/vue-3'

import Video from './Video.vue'

/*
 * Youtube: 560 x 315
 * Vimeo: 425 x 350
 * Dialymotion: 480 x 270
 *
 */




const patterns = [
    {
        regex: /youtu\.be\/(?<VIDEOID>[\w\-]+)/i,
        type: 'youtube',
    },
    {
        regex: /youtube\.com(?:.+)v=(?<VIDEOID>[^&]+)/i,
        type: 'youtube',
    },
    {
        regex: /youtube.com\/embed\/(?<VIDEOID>[\w\-]+)/i,
        type: 'youtube',
    },
    {
        regex: /vimeo\.com\/(?<VIDEOID>\d+)/,
        type: 'vimeo',
    },
    {
        regex: /dailymotion\.com\/video\/(?<VIDEOID>[^_]+)/,
        type: 'dailymotion',
    },
    {
        regex: /dai\.ly\/(?<VIDEOID>[^_]+)/,
        type: 'dailymotion',
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
            'data-videoid': {
                default: null
            }
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
                const pattern = patterns.find((pattern) => pattern.regex.exec(options.src))

                if (pattern) {
                    const match = pattern.regex.exec(options.src)
                    const url = `https://www.youtube.com/embed/${match.groups.VIDEOID}`
                    console.log(match)

                    return commands.insertContent({
                        type: this.name,
                        attrs: {
                            src: url,
                            'data-videoid': match.groups.VIDEOID, 
                            width: 560,
                            height: 315
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
