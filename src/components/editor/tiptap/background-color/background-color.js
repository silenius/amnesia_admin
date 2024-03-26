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

                        renderHTML: (attrs) => {
                            if (Array.isArray(attrs.backgroundColor)) {
                                return {
                                    class: `${attrs.backgroundColor.map((x) => [!x.breakpoint ? 'bg' : `${x.breakpoint}:bg`, x.color, x.shade].filter(Boolean).join('-')).join(' ')}`
                                }
                            } else if (attrs.backgroundColor) {
                                return { style: `background-color: ${attrs.backgroundColor}` }
                            }
                        }
                    }
                }
            }
        ]
    },

    addCommands() {
        return {
            setBackgroundColor: (color, shade, breakpoint) => (p) => {
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

                const oldAttrs = getAttributes(p.state, 'textClass').backgroundColor
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
                        backgroundColor: mark
                    }
                ).run()

            },

        }
    },
})
