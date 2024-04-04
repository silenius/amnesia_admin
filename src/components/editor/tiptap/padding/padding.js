import {
    Extension,
    getAttributes
} from '@tiptap/core'

import {
    generate_responsive_cls
} from '../utils'

import {
    render_padding_attrs
} from './utils'

const _parse = (side, elem, levels) => {
    const is_padding = generate_responsive_cls(side)
    const matches = []

    for (const name of elem.classList) {
        const result = name.split('-')

        if (
            result.length == 2 
                && is_padding.has(result[0])
                && levels.has(parseFloat(result[1]))
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
    return render_padding_attrs(attrs, side)
}

export const Padding = Extension.create({
    name: 'padding',

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
                    px: {
                        default: null,
                        parseHTML: (elem) => _parse('px', elem, this.options.levels),
                        renderHTML: (attrs) =>  _render(attrs, 'px')
                    },
                    py: {
                        default: null,
                        parseHTML: (elem) => _parse('py', elem, this.options.levels),
                        renderHTML: (attrs) => _render(attrs, 'py')
                    },
                    pt: {
                        default: null,
                        parseHTML: (elem) => _parse('pt', elem, this.options.levels),
                        renderHTML: (attrs) => _render(attrs, 'pt')
                    },
                    pr: {
                        default: null,
                        parseHTML: (elem) => _parse('pr', elem, this.options.levels),
                        renderHTML: (attrs) => _render(attrs, 'pr')
                    },
                    pb: {
                        default: null,
                        parseHTML: (elem) => _parse('pb', elem, this.options.levels),
                        renderHTML: (attrs) => _render(attrs, 'pb')
                    },
                    pl: {
                        default: null,
                        parseHTML: (elem) => _parse('pl', elem, this.options.levels),
                        renderHTML: (attrs) => _render(attrs, 'pl')
                    },
                }
            }
        ]
    },

    addCommands() {
        return {
            setPadding: (side, level, breakpoint) => (p) => {
                level = parseFloat(level)
                console.debug('===>>> setPadding, side: ', side, ', level: ', level, ', bp: ', breakpoint)
                const type = p.state.selection.node ? p.state.selection.node.type.name : 'textClass'

                const oldAttrs = getAttributes(p.state, type)[side]
                console.debug('===>>> setPadding, oldAttrs: ', oldAttrs)

                const newAttrs = level > 0 ? {
                    breakpoint: breakpoint,
                    level: level
                } : false

                const mark = Array.isArray(oldAttrs)
                    ? oldAttrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                mark.push(newAttrs)

                console.debug('===>>> setPadding, mark: ', mark)

                if (p.state.selection.node) {
                    console.log('===>>> setPadding updateAttributes')
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
            },

            removePadding: (side, breakpoint) => (p) => {
                // TODO
            }
        }
    }
})
