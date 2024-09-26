import {
    Extension,
} from '@tiptap/core'

import {
    extract_tw_attrs,
    render_tw_attrs
} from '../utils'

const levels = [
    'auto', '0', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6', 
    '7', '8', '9', '10', '11', '12', '14', '16', '20', '24', '28', '32', '36',
    '40', '44', '48', '52', '56', '60', '64', '72', '80', '96'
]

export const Padding = Extension.create({
    name: 'padding',

    addOptions() {
        return {
            types: [],
            levels: levels
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    px: {
                        default: null,
                        parseHTML: elem => extract_tw_attrs(elem, this.options.levels, 'px-'),
                        renderHTML: (attrs) => render_tw_attrs(attrs, 'px')
                    },
                    py: {
                        default: null,
                        parseHTML: elem => extract_tw_attrs(elem, this.options.levels, 'py-'),
                        renderHTML: (attrs) => render_tw_attrs(attrs, 'py')
                    },
                    pt: {
                        default: null,
                        parseHTML: elem => extract_tw_attrs(elem, this.options.levels, 'pt-'),
                        renderHTML: (attrs) => render_tw_attrs(attrs, 'pt')
                    },
                    pr: {
                        default: null,
                        parseHTML: elem => extract_tw_attrs(elem, this.options.levels, 'pr-'),
                        renderHTML: (attrs) => render_tw_attrs(attrs, 'pr')
                    },
                    pb: {
                        default: null,
                        parseHTML: elem => extract_tw_attrs(elem, this.options.levels, 'pb-'),
                        renderHTML: (attrs) => render_tw_attrs(attrs, 'pb')
                    },
                    pl: {
                        default: null,
                        parseHTML: elem => extract_tw_attrs(elem, this.options.levels, 'pl-'),
                        renderHTML: (attrs) => render_tw_attrs(attrs, 'pl')
                    },
                }
            }
        ]
    },

    addCommands() {
        return {
            setPadding: (side, level, breakpoint=null, type=undefined) => (p) => {
                if (!type) {
                    type = this.options.types.find((e) => p.editor.isActive(e))
                }

                const oldAttrs = p.editor.getAttributes(type)[side]

                // We set a new value for that side at some breakpoint, so
                // remove old value
                const mark = Array.isArray(oldAttrs)
                    ? oldAttrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if (this.options.levels.indexOf(level) !== -1) {
                    // New value
                    mark.push({
                        breakpoint: breakpoint,
                        tw: `${side}-${level}`
                    })
                }

                if (p.state.selection.empty || p.state.selection.node) {
                    return p.commands.updateAttributes(
                        type, Object.fromEntries([[`${side}`, mark]])
                    )
                } else {
                    return p.chain().setMark(
                        'textClass', Object.fromEntries([[`${side}`, mark]])
                    )
                }
            },
        }
    }
})
