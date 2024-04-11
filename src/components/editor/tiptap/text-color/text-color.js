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
    generate_responsive_cls
} from '../utils'

const is_text = generate_responsive_cls('text')

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
                            if (elem.style.color) {
                                return elem.style.color
                            } 

                            const matches = []

                            for (const name of elem.classList) {
                                const result = name.split('-')

                                if (result.length > 1 && is_text.has(result[0])) {
                                    // text or md:text, lg:text ?
                                    const [part1, part2] = result[0].split(':')
                                    const breakpoint = part2 !== undefined ? part1 : null

                                    if (result.length == 2 && unshaded_colors.has(result[1])) {
                                        // text-black, text-transparent, md:text-white
                                        matches.push({
                                            breakpoint: breakpoint,
                                            color: result[1]
                                        })
                                    } else if(
                                        // text-red-500, md:text-green-800, etc 
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

                        renderHTML: (attrs) => {
                            if (Array.isArray(attrs.textColor)) {
                                return {
                                    class: `${attrs.textColor.map((x) => [!x.breakpoint ? 'text' : `${x.breakpoint}:text`, x.color, x.shade].filter(Boolean).join('-')).join(' ')}`
                                }
                            } else if (attrs.textColor) {
                                return { style: `color: ${attrs.textColor}` }
                            }
                        }
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

                const oldAttrs = getAttributes(p.state, 'textClass').textColor
                const newAttrs = {
                    breakpoint: breakpoint,
                    color: color, 
                    shade: shade 
                }

                let mark

                if (Array.isArray(oldAttrs)) {
                    mark = oldAttrs.filter((x) => x.breakpoint !== breakpoint)
                    mark.push(newAttrs)
                } else {
                    mark = [newAttrs]
                }

                return p.chain().setMark(
                    'textClass', {
                        textColor: mark
                    }
                ).run()
            },

        }
    },


})
