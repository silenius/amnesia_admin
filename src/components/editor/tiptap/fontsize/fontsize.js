import { Extension } from '@tiptap/core'

export const FontSize = Extension.create({
    name: 'fontSize',

    addOptions() {
        return {
            types: [],
            sizes: [
                'xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', 
                '6xl', '7xl', '8xl', '9xl'
            ]
        }
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    fontSize: {
                        default: null,

                        parseHTML: elem => { 
                            if (elem.style.fontSize) {
                                return elem.style.fontSize
                            } else {
                                for (const size of this.options.sizes) {
                                    if (elem.classList.contains(`text-${size}`)) {
                                        return size
                                    }
                                }
                            }
                        },
                        
                        renderHTML: attrs => {
                            if (attrs.fontSize) {
                                if (this.options.sizes.indexOf(attrs.fontSize)) {
                                    return { class: `text-${attrs.fontSize}` }
                                } else {
                                    return { style: attrs.fontSize }
                                }
                            }
                        }
                    }
                }
            }
        ]
    },

    addCommands() {
        return {
            setFontSize: (size) => ({commands, tr}) => {
                if (!this.options.sizes.includes(size)) {
                    return false
                }

                return this.options.types.every(
                    type => commands.updateAttributes(type, { fontSize: size })
                )
            },

            unsetFontSize: () => ({ commands }) => {
                return this.options.types.every(
                    type => commands.resetAttributes(type, 'fontSize')
                )
            },
        }
    },
})
