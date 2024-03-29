import { 
    Extension,
} from '@tiptap/core'

import { sizes }  from './constants'

export const FontSize = Extension.create({
    name: 'fontSize',

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

                        parseHTML: (elem) => { 
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

                        renderHTML: (attrs) => {
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
            setFontSize: (size) => ({ chain, editor, view, state, commands, tr }) => {
                if (!this.options.sizes[size]) {
                    return false
                }

                if (tr.selection.node?.type.isText === false) {
                    return false
                }

                /*
                if (tr.selection.empty) {
                    return this.options.types.every(
                        type => commands.updateAttributes(type, { fontSize: size })
                    )
                }*/

                return chain().setMark('textClass', { fontSize: size }).run()
            },
        }
    },
})
