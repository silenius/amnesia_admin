import { 
    Extension,
    getAttributes
} from '@tiptap/core'

import {
    render_float_attrs 
} from './utils'

import {
    generate_responsive_cls
} from '../utils'

const floats = ['right', 'left', 'none']

export const Float = Extension.create({
    name: 'float',

    addOptions() {
        return {
            types: [],
            floats: floats,
            default_float: null,
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    float: {
                        default: null,
                        
                        parseHTML: elem => {
                            const is_float = new Set(
                                this.options.floats.map(
                                    (x) => Array.from(generate_responsive_cls(`float-${x}`))
                                ).flat()
                            )

                            const matches = []

                            for (const name of elem.classList) {
                                if (is_float.has(name)) {
                                    const float = name.split('-').pop()
                                    const [part1, part2] = name.split(':')
                                    const breakpoint = part2 !== undefined ? part1 : null

                                    matches.push({
                                        float: float,
                                        breakpoint: breakpoint
                                    })
                                }
                            }

                            return matches.length ? matches : null
                        },
                        
                        renderHTML: attrs => {
                            return render_float_attrs(attrs)
                        },
                    },
                },
            },
        ]
    },

    addCommands() {
        return {
            setFloat: (float, breakpoint = null) => (p) => {
                console.debug('===>>> setFloat, float: ', float, ', bp: ', breakpoint)
                const type = this.options.types.find((e) => p.editor.isActive(e))
                const oldAttrs = p.editor.getAttributes(type)['float']
                console.debug('===>>> setFloat, oldAttrs: ', oldAttrs)

                const attr = Array.isArray(oldAttrs)
                    ? oldAttrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if (float !== 'undefined') {
                    // New value
                    attr.push({
                        breakpoint: breakpoint,
                        float: float
                    })
                }

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
                if (type != 'textClass') {
                    return p.commands.updateAttributes(
                        type, { float: attr }
                    )
                } else {
                    return p.chain().setMark(
                        'textClass', { float: attr }
                    ).run()
                }
            },
        }
    },
})
