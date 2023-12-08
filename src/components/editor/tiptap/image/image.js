import { mergeAttributes } from '@tiptap/core'
import { Image as TipTapImage } from '@tiptap/extension-image';
import { VueNodeViewRenderer } from '@tiptap/vue-3';
import Image from './Image.vue';

export default TipTapImage.extend({
    addAttributes() {
        return {
            ...this.parent?.(),

            width: {
                default: 'auto',
                renderHTML: attrs => {
                    return {
                        width: `${attrs.width}`
                    }
                }
            },

            height: {
                default: 'auto',
            },
        };
    },

    addCommands() {
        return {
            ...this.parent?.(),
        };
    },

    addNodeView() {
        return VueNodeViewRenderer(Image);
    }
});
