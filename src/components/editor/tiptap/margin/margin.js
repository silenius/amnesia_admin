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

export const Margin = Extension.create({
    name: 'margin',

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
                    mx: {
                        default: null,
                        parseHTML: elem => extract_tw_attrs(elem, this.options.levels, 'mx-'),
                        renderHTML: (attrs) => render_tw_attrs(attrs, 'mx')
                    },
                    my: {
                        default: null,
                        parseHTML: elem => extract_tw_attrs(elem, this.options.levels, 'my-'),
                        renderHTML: (attrs) => render_tw_attrs(attrs, 'my')
                    },
                    mt: {
                        default: null,
                        parseHTML: elem => extract_tw_attrs(elem, this.options.levels, 'mt-'),
                        renderHTML: (attrs) => render_tw_attrs(attrs, 'mt')
                    },
                    mr: {
                        default: null,
                        parseHTML: elem => extract_tw_attrs(elem, this.options.levels, 'mr-'),
                        renderHTML: (attrs) => render_tw_attrs(attrs, 'mr')
                    },
                    mb: {
                        default: null,
                        parseHTML: elem => extract_tw_attrs(elem, this.options.levels, 'mb-'),
                        renderHTML: (attrs) => render_tw_attrs(attrs, 'mb')
                    },
                    ml: {
                        default: null,
                        parseHTML: elem => extract_tw_attrs(elem, this.options.levels, 'ml-'),
                        renderHTML: (attrs) => render_tw_attrs(attrs, 'ml')
                    },
                }
            }
        ]
    },

    addCommands() {
        return {
            setMargin: (side, level, breakpoint=null, type=undefined) => (p) => {
                if (!type) {
                    type = this.options.types.find((e) => p.editor.isActive(e))
                }

                // Get attributes for the side 
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
