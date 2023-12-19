import { Extension } from '@tiptap/core'

export const Float = Extension.create({
    name: 'float',

    addOptions() {
        return {
            types: [],
            directions: ['left', 'right'],
            default_direction: null,
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    float: {
                        default: null,
                        parseHTML: element => { 
                            return element.style.float ? element.style.float :
                                element.classList.contains('float-left') ? 'left' :
                                    element.classList.contains('float-right') ? 'right' :
                                        this.options.default_direction
                        },
                        renderHTML: attributes => {
                            if (attributes.float) {
                                return { class: `float-${attributes.float}` }
                            }
                        },
                    },
                },
            },
        ]
    },

    addCommands() {
        return {
            setFloat: (direction) => (p) => {
                if (!this.options.directions.includes(direction)) {
                    return false
                }

                if (p.tr.curSelection.node.attrs.float == direction) {
                    return p.commands.unsetFloat()
                }

                return this.options.types.every(type => p.commands.updateAttributes(type, { float: direction }))
            },

            unsetFloat: () => ({ commands }) => {
                return this.options.types.every(type => commands.resetAttributes(type, 'float'))
            },
        }
    },
})
