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

export const BackgroundColor = Extension.create({
    name: 'backgroundColor',

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
                    backgroundColor: {
                        default: null,

                        parseHTML: (elem) => { 
                            const colors = build_palette(
                                this.options.shaded_colors,
                                this.options.shades
                            ).concat(
                                this.options.unshaded_colors
                            )

                            return extract_tw_attrs(elem, colors, 'bg-')
                        },

                        renderHTML: (attrs) => render_tw_attrs(attrs, 'backgroundColor')
                    }
                }
            }
        ]
    },

    addCommands() {
        return {
            setBackgroundColor: ({color, shade, breakpoint=null, type=undefined, selected=undefined}) => (p) => {
                if ((
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

                if (!selected && !type) {
                    type = this.options.types.find((e) => p.editor.isActive(e))
                }

                let attrs = selected ? selected.node.attrs['backgroundColor'] : p.editor.getAttributes(type)['backgroundColor']

                let attr = Array.isArray(attrs)
                    ? attrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                    // New value
                attr.push({
                    breakpoint: breakpoint,
                    color: color, 
                    shade: shade,
                    tw: `bg-${color}-${shade}`
                })

                attr = {
                    backgroundColor: attr
                }

                if (!p.editor.state.selection.empty) {
                    return p.commands.setMark('textClass', attr)
                } else if (selected) {
                    return p.commands._updateNodeAttributes(
                        selected.pos, selected.node, attr
                    )
                } else {
                    return p.commands._updateAttributes(
                        type, attr
                    )
                }
            },
        }
    },
})
