import {
    Extension,
    getAttributes
} from '@tiptap/core'

import {
    unshaded_colors,
    shaded_colors,
    shades,
    build_palette
} from '../colors'

import {
    extract_tw_attrs,
    render_tw_attrs
} from '../utils'

export const TextColor = Extension.create({
    name: 'textColor',

    addOptions() {
        return {
            types: [],
            unshaded_colors: unshaded_colors,
            shaded_colors: shaded_colors,
            shades: shades,
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
                            const colors = build_palette(
                                this.options.shaded_colors,
                                this.options.shades
                            ).concat(
                                this.options.unshaded_colors
                            )

                            return extract_tw_attrs(elem, colors, 'text-')
                        },

                        renderHTML: (attrs) => render_tw_attrs(attrs, 'textColor')
                    }
                }
            }
        ]
    },

    addCommands() {
        return {
            setTextColor: (color, shade, breakpoint = null) => (p) => {
                if ( 
                    p.tr.selection.node?.type.isText === false
                        || (
                            shade !== undefined
                                && (!this.options.shaded_colors.has(color)
                                    || !this.options.shades.has(parseInt(shade)))
                        )
                        || (
                            shade === undefined
                                && !this.options.unshaded_colors.has(color)
                        )
                ) {
                    return null
                }

                const oldAttrs = p.editor.getAttributes('textClass').textColor
                const mark = Array.isArray(oldAttrs)
                    ? oldAttrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                mark.push({
                    breakpoint: breakpoint,
                    color: color, 
                    shade: shade,
                    tw: `text-${color}-${shade}`
                })

                return p.chain().setMark(
                    'textClass', {
                        textColor: mark
                    }
                ).run()
            },

        }
    },


})
