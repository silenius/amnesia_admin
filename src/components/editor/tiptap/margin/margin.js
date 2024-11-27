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
            setMargin: ({side, level, breakpoint=null, type=undefined, selected=undefined}) => (p) => {
                console.debug('===> BEGIN setMargin <===', p)

                /*
                if (selected) {
                    console.log(selected.node.attrs)
                    return p.chain()._updateNodeAttributes(
                        selected.pos, 
                        selected.node, 
                        Object.fromEntries(
                            [[`${side}`, [{
                                breakpoint: breakpoint,
                                tw: `${side}-${level}`
                            }]]]
                        )
                    )
                }
                */

                if (!selected && !type) {
                    type = this.options.types.find((e) => p.editor.isActive(e))
                }

                let attrs = selected ? selected.node.attrs[side] : p.editor.getAttributes(type)[side]
                let attr = Array.isArray(attrs)
                    ? attrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if (this.options.levels.indexOf(level) !== -1) {
                    // New value
                    attr.push({
                        breakpoint: breakpoint,
                        tw: `${side}-${level}`
                    })
                }

                attr = Object.fromEntries([[`${side}`, attr]])
            
                    p.commands._updateNodeAttributes(
                        selected.pos, selected.node, attr
                    )

                    return true

                if (!p.editor.state.selection.empty) {
                    return p.commands.setMark('textClass', attr)
                } else if (selected) {
                    return p.commands._updateNodeAttributes(
                        selected.pos, selected.node, attr
                    )
                } else {
                    return p.commands._updateAttributes(
                        type, attr
                    )
                }

            }
        }
    }
})
