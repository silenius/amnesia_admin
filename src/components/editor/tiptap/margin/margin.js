import {
    Extension,
} from '@tiptap/core'

import {
    generate_responsive_cls
} from '../utils'

import {
    render_margin_attrs,
    parse_level
} from './utils'

const _parse = (side, elem, levels) => {
    const is_margin = generate_responsive_cls(side)
    const matches = []

    for (const name of elem.classList) {
        const result = name.split('-')

        if (result.length == 2) {
            const side = result[0]
            const level = parse_level(result[1])

            if (is_margin.has(side) && levels.has(level)) {
                // text or md:text, lg:text ?
                const [part1, part2] = side.split(':')
                const breakpoint = part2 !== undefined ? part1 : null

                matches.push({
                    breakpoint: breakpoint,
                    level: level
                })
            }
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
                'auto', 'undefined', 0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 
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
                        renderHTML: (attrs) => _render(attrs, 'mx')
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
            setMargin: (side, level, breakpoint = null) => (p) => {
                level = parse_level(level)
                console.debug('===>>> setMargin, side: ', side, ', level: ', level, ', bp: ', breakpoint)
                const type = this.options.types.find((e) => p.editor.isActive(e))

                if (!type) {
                    return false
                }

                // Get attributes for the side 
                const oldAttrs = p.editor.getAttributes(type)[side]
                console.debug('===>>> setMargin, oldAttrs: ', oldAttrs)

                // We set a new value for that side at some breakpoint, so
                // remove old value
                const mark = Array.isArray(oldAttrs)
                    ? oldAttrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if (level !== 'undefined') {
                    // New value
                    mark.push({
                        breakpoint: breakpoint,
                        level: level
                    })
                }

                // New value
                console.debug('===>>> setMargin, mark: ', mark)

                if (p.state.selection.empty || p.state.selection.node) {
                    return p.chain().updateAttributes(
                        type, Object.fromEntries([[`${side}`, mark]])
                    ).setNodeSelection(
                        p.state.selection.anchor
                    ).run()
                } else {
                    return p.chain().setMark(
                        'textClass', Object.fromEntries([[`${side}`, mark]])
                    )
                }
            }
        }
    }
})
