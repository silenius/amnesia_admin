import {
    Extension,
    getAttributes
} from '@tiptap/core'

import {
    generate_responsive_cls
} from '../utils'

import {
    render_margin_attrs
} from './utils'

const _parse = (side, elem, levels) => {
    const is_margin = generate_responsive_cls(side)
    const matches = []

    for (const name of elem.classList) {
        const result = name.split('-')

        if (
            result.length == 2 
                && is_margin.has(result[0])
                && levels.has(parseInt(result[1]))
        ) {
            // text or md:text, lg:text ?
            const [part1, part2] = result[0].split(':')
            const breakpoint = part2 !== undefined ? part1 : null

            matches.push({
                breakpoint: breakpoint,
                level: result[1]
            })
        }
    }

    return matches.length ? matches : null
}

const _render = (attrs, side) => {
    return render_margin_attrs(attrs, side)
}

export const Margin = Extension.create({
    name: 'margin',

    addOptions() {
        return {
            types: [],
            levels: new Set([
                0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 
                14, 16, 20, 24, 28, 32
            ])
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    mx: {
                        default: null,
                        parseHTML: (elem) => _parse('mx', elem, this.options.levels),
                        renderHTML: (attrs) =>  _render(attrs, 'mx')
                    },
                    my: {
                        default: null,
                        parseHTML: (elem) => _parse('my', elem, this.options.levels),
                        renderHTML: (attrs) => _render(attrs, 'my')
                    },
                    mt: {
                        default: null,
                        parseHTML: (elem) => _parse('mt', elem, this.options.levels),
                        renderHTML: (attrs) => _render(attrs, 'mt')
                    },
                    mr: {
                        default: null,
                        parseHTML: (elem) => _parse('mr', elem, this.options.levels),
                        renderHTML: (attrs) => _render(attrs, 'mr')
                    },
                    mb: {
                        default: null,
                        parseHTML: (elem) => _parse('mb', elem, this.options.levels),
                        renderHTML: (attrs) => _render(attrs, 'mb')
                    },
                    ml: {
                        default: null,
                        parseHTML: (elem) => _parse('ml', elem, this.options.levels),
                        renderHTML: (attrs) => _render(attrs, 'ml')
                    },
                }
            }
        ]
    },

    addCommands() {
        return {
            setMargin: (side, level, breakpoint) => (p) => {
                const oldAttrs = getAttributes(p.state, 'textClass')[side]
                const newAttrs = {
                    breakpoint: breakpoint,
                    level: level
                }

                let mark

                if (Array.isArray(oldAttrs)) {
                    mark = oldAttrs.filter((x) => x.breakpoint !== breakpoint)
                    mark.push(newAttrs)
                } else {
                    mark = [newAttrs]
                }

                if (p.state.selection.node) {
                    return this.options.types.every(
                        type => p.commands.updateAttributes(
                            type, Object.fromEntries([[`${side}`, mark]])
                        )
                    )
                } else {
                    return p.chain().setMark(
                        'textClass', Object.fromEntries([[`${side}`, mark]])
                    ).run()
                }
            }
        }
    }
})
