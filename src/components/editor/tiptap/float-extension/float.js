import { 
    Extension,
    getAttributes
} from '@tiptap/core'

import {
    extract_tw_attrs,
    render_tw_attrs
} from '../utils'

const floats = [
    'float-right', 'float-left', 'float-none'
]

export const Float = Extension.create({
    name: 'float',

    addOptions() {
        return {
            types: [],
            floats: floats,
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    float: {
                        default: null,
                        parseHTML: elem => extract_tw_attrs(elem, this.options.floats),
                        renderHTML: attrs => render_tw_attrs(attrs, 'float')
                    },
                },
            },
        ]
    },

    addCommands() {
        return {
            setFloat: (float, breakpoint=null, type=undefined) => (p) => {
                if (!type) {
                    type = this.options.types.find((e) => p.editor.isActive(e))
                }
                //const ext = p.editor.extensionManager.extensions.find((e) => e.name == type)
                const oldAttrs = p.editor.getAttributes(type)['float']

                const attr = Array.isArray(oldAttrs)
                    ? oldAttrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if (this.options.floats.indexOf(float) !== -1) {
                    // New value
                    attr.push({
                        breakpoint: breakpoint,
                        tw: float
                    })
                }

                return p.commands.updateAttributes(
                    type, { float: attr }
                )
 
                // TODO: support mark types (with selection?)
                /*
                switch (ext.type) {
                    case 'node':
                        return p.commands.updateAttributes(
                            type, { float: attr }
                        )
                        break
                }
                */

                // New value
                /*
                console.debug('===>>> setFloat, attr: ', attr)
                const { view, state } = p.editor
                const { from, to } = view.state.selection
                const text = state.doc.textBetween(from, to, '')
                console.log(text)
                console.log(p)
                */
                // replace with if this.editor.extensionManager.extensions. ...
            },
        }
    },
})
