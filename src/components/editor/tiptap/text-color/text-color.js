import {
    Extension
} from '@tiptap/core'

import { color_names, color_variants } from './constants'
import { build_color_class } from './utils'

export const TextColor = Extension.create({
    name: 'textColor',

    addOptions() {
        return {
            types: [],
            color_names: color_names,
            color_variants: color_variants,
            allColors: () => build_color_class(this.color_names, this.color_variants)
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    textColor: {
                        default: null,

                        parseHTML: (elem) => { 
                            if (elem.style.color) {
                                return elem.style.color
                            } else {
                                for (const name of elem.classList) {
                                    if (this.options.colors.has(`${text}-name`)) {
                                        return name
                                    }
                                }
                            }
                        },

                        renderHTML: (attrs) => {
                            if (attrs.textColor?.color && attrs.textColor?.variant) {
                                return { 
                                    class: `text-${attrs.textColor.color}-${attrs.textColor.variant}` 
                                }
                            }

                            return { style: `color: ${attrs.textColor}` }
                        }
                    }
                }
            }
        ]
    },

    addCommands() {
        return {
            setTextColor: (color, variant) => ({ chain, editor, view, state, commands, tr }) => {
                /*
                if (!this.options.sizes[size]) {
                    return false
                }
                */

                if (tr.selection.node?.type.isText === false) {
                    return false
                }

                return chain().setMark(
                    'textClass', { 
                        textColor: { 
                            color: color, 
                            variant: variant 
                        }
                    }
                ).run()
            },
        }
    },


})
