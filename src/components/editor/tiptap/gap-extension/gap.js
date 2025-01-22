import { 
    Extension,
    getAttributes
} from '@tiptap/core'

import {
    extract_tw_attrs,
    render_tw_attrs
} from '../utils'

const gaps = [
    '0', 'px', '0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '5', '6', '7',
    '8', '9', '10', '11', '12', '14', '16', '20', '24', '28', '32', '36', '40',
    '44', '48', '52', '56', '60', '64', '72', '80', '96'
]

export const Gap = Extension.create({
    name: 'gap',

    addOptions() {
        return {
            types: ['flexContainer'],
            gaps: gaps
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    gapX: {
                        default: null,
                        parseHTML: elem => extract_tw_attrs(elem, this.options.gaps, 'gap-x-'),
                        renderHTML: (attrs) => render_tw_attrs(attrs, 'gapX')
                    },
                    gapY: {
                        default: null,
                        parseHTML: elem => extract_tw_attrs(elem, this.options.gaps, 'gap-y-'),
                        renderHTML: (attrs) => render_tw_attrs(attrs, 'gapY')
                    },
                },
            },
        ]
    },

    addCommands() {
        return {
            setGap: ({side, gap, selected=null, type=undefined, breakpoint=undefined}) => (p) => {
                if (!selected && !type) {
                    type = this.options.types.find((e) => p.editor.isActive(e))
                }

                let attrs = selected ? selected.node.attrs[side] : p.editor.getAttributes(type)[side]

                let attr = Array.isArray(attrs)
                    ? attrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                const tw = side == 'gapX' ? 'gap-x-' : 'gap-y-'

                if (this.options.gaps.indexOf(gap) !== -1) {
                    // New value
                    attr.push({
                        breakpoint: breakpoint,
                        tw: `${tw}${gap}`
                    })
                }

                attr = Object.fromEntries([[`${side}`, attr]])

                if (selected) {
                    return p.commands._updateNodeAttributes(
                        selected.pos, selected.node, attr
                    )
                } else {
                    return p.commands.updateAttributes(
                        type, attr
                    )
                }
            },
        }
    },
})
