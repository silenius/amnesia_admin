import { Image as TipTapImage } from '@tiptap/extension-image';
import { VueNodeViewRenderer } from '@tiptap/vue-3';
import { backend_url } from '@/composables/fetch.js';
import Image from './Image.vue';

export default TipTapImage.extend({
    addAttributes() {
        return {
            ...this.parent?.(),

            width: {
            },

            height: {
            },

            src: {
                default: null,
                parseHTML: elem => backend_url(elem.getAttribute('data-objectid')),
                renderHTML: attrs => {
                    return {
                        src: backend_url(attrs['data-objectid'])
                    }
                }   
            },

            "data-objectid": {
                default: null
            }
        };
    },
    
    parseHTML() {
        return [
            {
                tag: this.options.allowBase64
                    ? 'img[src][data-objectid]'
                    : 'img[src][data-objectid]:not([src^="data:"])',
                //getAttrs: elem => elem.hasAttribute('data-objectid')
            },
        ]
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
