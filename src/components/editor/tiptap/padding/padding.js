import {
    Extension,
    getAttributes
} from '@tiptap/core'

const _is_padding = (side) => new Set([
    `${side}`,
    `sm:${side}`,
    `md:${side}`,
    `lg:${side}`,
    `xl:${side}`,
    `2xl:${side}`,
])

const _parse = (side, elem, levels) => {
    const is_padding = _is_padding(side)
    const matches = []

    for (const name of elem.classList) {
        const result = name.split('-')

        if (result.length == 2 && is_padding.has(result[0])) {
            matches.push({
                breakpoint: result[0],
                level: result[1]
            })
        }
    }

    return matches.length ? matches : null
}

const _render = (attrs, side) => {
    if (Array.isArray(attrs[side])) {
        return {
            class: `${attrs[side].map((x) => Object.values(x).join('-')).join(' ')}`
        }
    }

}


export const Padding = Extension.create({
    name: 'padding',

    addOptions() {
        return {
            types: [],
            levels: new Set([0, 0.5, 1, 1.5, 2, 3, 3.5, 4])
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
            }
        }
    }
})
