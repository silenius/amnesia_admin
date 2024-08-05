import {
    mergeAttributes,
    Node
} from '@tiptap/core'

import { VueNodeViewRenderer } from '@tiptap/vue-3'

import Video from './Video.vue'
import { 
    patterns, 
    guess_video, 
    sizes 
} from './utils'

/*
 * Youtube: 560 x 315
 * Vimeo: 425 x 350
 * Dialymotion: 480 x 270
 *
 */

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
            },
            'data-controls': {
                default: true
            },
            'data-autoplay': {
                default: false
            },
            'data-type': {
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
                const { type, attrs } = guess_video(options.src) 

                if (type) {
                    let [width, height] = sizes[type]

                    if (options.width) {
                        width = options.width
                    }

                    if (options.height) {
                        height = options.height
                    }

                    return commands.insertContent({
                        type: this.name,
                        attrs: {
                            'data-videoid': attrs.VIDEOID, 
                            'data-autoplay': options.autoplay,
                            'data-controls': options.controls,
                            'data-type': type,
                            width: width,
                            height: height
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
