import {
    Extension,
    getAttributes
} from '@tiptap/core'

import {
    render_font_family_attrs 
} from './utils'

import {
    generate_responsive_cls
} from '../utils'

export const FontFamily = Extension.create({
    name: 'fontFamily',

    addOptions() {
        return {
            types: [],
            families: [
                'sans', 'serif', 'mono'
            ]
        }

    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    fontFamily: {
                        default: null,

                        parseHTML: elem => {
                            const is_font_family = new Set(
                                this.options.families.map(
                                    (x) => Array.from(generate_responsive_cls(`font-${x}`))
                                ).flat()
                            )

                            const matches = []

                            for (const name of elem.classList) {
                                if (is_font_family.has(name)) {
                                    const [part1, part2] = name.split(':')
                                    const breakpoint = part2 !== undefined ? part1 : null
                                    let family = breakpoint === null ? part1 : part2
                                    family = family.replace(/^font-/, '')

                                    matches.push({
                                        family: family,
                                        breakpoint: breakpoint
                                    })
                                }
                            }

                            return matches.length ? matches : null

                        },

                        renderHTML: attrs => {
                            return render_font_family_attrs(attrs)
                        },
                    },
                },
            },
        ]
    },

    addCommands() {
        return {
            setFontFamily: (family, breakpoint = null) => (p) => {
                if (
                    p.tr.selection.node?.type.isText === false
                        || this.options.families.indexOf(family) === -1
                ) {
                    return null
                }

                const oldAttrs = p.editor.getAttributes('textClass').fontFamily
                const newAttrs = {
                    breakpoint: breakpoint,
                    family: family, 
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
                        fontFamily: mark
                    }
                ).run()
            },
        }
    },
})
