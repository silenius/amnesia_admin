import {
    mergeAttributes,
    Node
} from '@tiptap/core'

import { VueNodeViewRenderer } from '@tiptap/vue-3'

import Video from './Video.vue'

export default Node.create({
    name: 'video',

    addOptions() {

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
                return commands.insertContent({
                    type: this.name,
                    attrs: options,
                })
            },
        }
    },

 

    addNodeView() {
        return VueNodeViewRenderer(Video);
    }

})
