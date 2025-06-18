import { 
    Extension,
    getAttributes
} from '@tiptap/core'

import {
    extract_tw_attrs,
    render_tw_attrs
} from '../utils'

const weights = [
    'font-thin', 'font-extralight', 'font-light', 'font-normal', 'font-medium',
    'font-semibold', 'font-bold', 'font-extrabold', 'font-black'
]

export const FontWeight = Extension.create({
    name: 'fontWeight',

    addOptions() {
        return {
            types: [],
            weights: weights
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    fontWeight: {
                        default: null,
                        parseHTML: elem => extract_tw_attrs(elem, this.options.weights),
                        renderHTML: attrs => render_tw_attrs(attrs, 'fontWeight')
                    },
                },
            },
        ]
    },

    addCommands() {
        return {
            setFontWeight: ({weight = null, breakpoint = null, type = undefined, selected = undefined}) => (p) => {
                if (!selected && !type) {
                    type = this.options.types.find((e) => p.editor.isActive(e))
                }

                if (p.tr.selection.node?.type.isText === false) {
                    return null
                }

                let attrs = selected ? selected.node.attrs['fontWeight'] : p.editor.getAttributes(type)['fontWeight']

                let attr = Array.isArray(attrs)
                    ? attrs.filter((x) => x.breakpoint !== breakpoint)
                    : []


                if (this.options.weights.indexOf(weight) !== -1) {
                    // New value
                    attr.push({
                        breakpoint: breakpoint,
                        tw: weight,
                    })
                }

                attr = {
                    fontWeight: attr
                }

                if (!p.tr.selection.empty && p.tr.selection.toJSON().type == 'text') {
                    return p.commands.setMark('textClass', attr)
                } else if (selected) {
                    return p.commands._updateNodeAttributes(
                        selected.pos, selected.node, attr
                    )
                } else {
                    return p.commands.updateAttributes(
                        type, attr
                    )
                }
            }
        }
    },

})
