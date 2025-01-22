import {
    Extension
} from '@tiptap/core'

import {
    render_container_attrs 
} from './utils'

import {
    generate_responsive_cls
} from '../utils'

const containers = ['container']

export const Container = Extension.create({
    name: 'container',

    addOptions() {
        return {
            types: [],
            containers: containers
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    container: {
                        default: null,
                        
                        parseHTML: elem => {
                            const is_container = new Set(
                                this.options.containers.map(
                                    (x) => Array.from(generate_responsive_cls(x))
                                ).flat()
                            )

                            const matches = []

                            for (const name of elem.classList) {
                                if (is_container.has(name)) {
                                    const [part1, part2] = name.split(':')
                                    const breakpoint = part2 !== undefined ? part1 : null
                                    const container = part2 !== undefined ? part2 : part1

                                    matches.push({
                                        container: container,
                                        breakpoint: breakpoint
                                    })
                                }
                            }

                            return matches.length ? matches : null

                        },
                        
                        renderHTML: attrs => {
                            return render_container_attrs(attrs)
                        },
                    },
                },
            },
        ]
    },

    addCommands() {
        return {
            setContainer: (container, breakpoint = null) => (p) => {
                const type = this.options.types.find((e) => p.editor.isActive(e))
                const oldAttrs = p.editor.getAttributes(type)['container']
                const attr = Array.isArray(oldAttrs)
                    ? oldAttrs.filter((x) => x.breakpoint !== breakpoint)
                    : []

                if (this.options.containers.indexOf(container) !== -1) {
                    // New value
                    attr.push({
                        breakpoint: breakpoint,
                        container: container,
                    })
                }

                return p.commands.updateAttributes(
                    type, { container: attr }
                )
            },
        }
    },

})
