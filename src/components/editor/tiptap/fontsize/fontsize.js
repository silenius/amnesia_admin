import { 
    Extension,
    mergeAttributes
} from '@tiptap/core'

import '@tiptap/extension-text-style';
import { sizes }  from './constants'

export const FontSize = Extension.create({
    name: 'fontSize',
    group: 'inline',

    addOptions() {
        return {
            types: [],
            sizes: sizes
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    fontSize: {
                        default: null,

                        parseHTML: elem => { 
                            if (elem.style.fontSize) {
                                return elem.style.fontSize
                            } else {
                                for (const [size, props] of Object.entries(this.options.sizes)) {
                                    if (elem.classList.contains(props.class)) {
                                        return size
                                    }
                                }
                            }
                        },

                        renderHTML: attrs => {
                            if (attrs.fontSize) {
                                const v = this.options.sizes[attrs.fontSize]

                                if (v) {
                                    return { class: v.class }
                                }

                                return { style: `font-size: ${attrs.fontSize}` }
                            }
                        }
                    }
                }
            }
        ]
    },

    addCommands() {
        return {
            setFontSize: (size) => ({ chain, editor, commands, tr }) => {
                if (!this.options.sizes[size]) {
                    return false
                }

                return chain().setMark('textStyle', { fontSize: size }).run()

            },
        }
    },
})
