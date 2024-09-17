import {
    Extension,
    getAttributes
} from '@tiptap/core'

import {
    unshaded_colors,
    shaded_colors,
    shades
} from '../colors'

import {
    render_bg_color_attrs
} from './utils'

import {
    generate_responsive_cls
} from '../utils'

const is_bg = generate_responsive_cls('bg')

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
                            if (elem.style.backgroundColor) {
                                return elem.style.backgroundColor
                            } 

                            const matches = []

                            for (const name of elem.classList) {
                                const result = name.split('-')

                                if (result.length > 1 && is_bg.has(result[0])) {
                                    // bg or md:bg, lg:bg ?
                                    const [part1, part2] = result[0].split(':')
                                    const breakpoint = part2 !== undefined ? part1 : null
                                    // bg-black, bg-transparent, md:bg-white
                                    if (result.length == 2 && unshaded_colors.has(result[1])) {
                                        matches.push({
                                            breakpoint: breakpoint,
                                            color: result[1]
                                        })
                                        // bg-red-500, md:bg-green-800, etc 
                                    } else if(
                                        result.length == 3 
                                            && shaded_colors.has(result[1]) 
                                            && shades.has(parseInt(result[2]))
                                    ) {
                                        matches.push({
                                            breakpoint: breakpoint,
                                            color: result[1],
                                            shade: result[2]
                                        })
                                    }
                                }

                            }

                            return matches.length ? matches : null

                        },

                        renderHTML: (attrs) => render_bg_color_attrs(attrs)
                    }
                }
            }
        ]
    },

    addCommands() {
        return {
            setBackgroundColor: (color, shade, breakpoint=null, type=undefined) => (p) => {
                if (!type) {
                    type = this.options.types.find((e) => p.editor.isActive(e))
                }

                const oldAttrs = p.editor.getAttributes(type).backgroundColor

                const mark = Array.isArray(oldAttrs)
                    ? oldAttrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if ((
                    shade !== undefined
                        && (this.options.shaded_colors.has(color)
                            || this.options.shades.has(parseInt(shade)))
                )
                    || (
                        shade === undefined
                            && this.options.unshaded_colors.has(color)
                    )
                ) {
                    mark.push({
                        breakpoint: breakpoint,
                        color: color, 
                        shade: shade 
                    })
                }

                if (p.state.selection.empty || p.state.selection.node) {
                    return p.commands.updateAttributes(
                        type, { backgroundColor: mark }
                    )
                } else {
                    return p.chain().setMark(
                        'textClass', { backgroundColor: mark }
                    ).run()
                }
            },

        }
    },
})
